import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/app.module';
import { uuid } from 'zod';

type RegisteredUser = {
  id: string;
  name: string;
  email: string;
  password: string;
};

type EntityWithId = {
  id: string;
};

let uniqueCounter = 0;
function uniqueSuffix(): string {
  uniqueCounter += 1;
  return Date.now().toString(36) + '-' + uniqueCounter.toString(36);
}

describe('Ownership security (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const registerUser = async (prefix: string): Promise<RegisteredUser> => {
    const suffix = uniqueSuffix();
    const name = prefix + '_' + suffix;
    const email = prefix + '.' + suffix + '@example.com';
    const password = 'Pass_' + suffix + '_123';

    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name,
        email,
        password,
        confirmPassword: password,
        type: 'User',
      })
      .expect(201);

    return {
      id: response.body.id,
      name,
      email,
      password,
    };
  };

  const loginAndGetAccessToken = async (
    email: string,
    password: string,
  ): Promise<string> => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password })
      .expect(200);

    const setCookieHeader = response.headers['set-cookie'];
    const cookies = Array.isArray(setCookieHeader)
      ? setCookieHeader
      : typeof setCookieHeader === 'string'
        ? [setCookieHeader]
        : undefined;

    if (!cookies) throw new Error('Missing set-cookie header');

    const accessCookie = cookies.find((cookie) =>
      cookie.startsWith('access_token='),
    );
    if (!accessCookie) throw new Error('Missing access_token cookie');

    return accessCookie.split(';')[0].replace('access_token=', '');
  };

  const authHeader = (token: string) => ({
    Cookie: 'access_token=' + token,
  });

  const createProject = async (
    token: string,
    suffix: string,
  ): Promise<EntityWithId> => {
    const response = await request(app.getHttpServer())
      .post('/projects')
      .set(authHeader(token))
      .send({
        project: {
          title: 'Project ' + suffix,
          content: 'Project content ' + suffix,
        },
      })
      .expect(201);

    return response.body as EntityWithId;
  };

  const createTask = async (
    token: string,
    projectId: string,
    suffix: string,
  ): Promise<EntityWithId> => {
    const response = await request(app.getHttpServer())
      .post('/projects/' + projectId + '/tasks')
      .set(authHeader(token))
      .send({
        task: {
          title: 'Task ' + suffix,
          content: 'Task content ' + suffix,
        },
      })
      .expect(201);

    return response.body as EntityWithId;
  };

  const createNote = async (
    token: string,
    projectId: string,
    taskId: string,
    suffix: string,
  ): Promise<EntityWithId> => {
    const response = await request(app.getHttpServer())
      .post('/projects/' + projectId + '/tasks/' + taskId + '/notes')
      .set(authHeader(token))
      .send({
        title: 'Note title ' + suffix,
        content: 'Note content ' + suffix,
      })
      .expect(201);

    return response.body as EntityWithId;
  };

  it('1) user A cannot update user B task', async () => {
    const userA = await registerUser('userA1');
    const userB = await registerUser('userB1');

    const tokenA = await loginAndGetAccessToken(userA.email, userA.password);
    const tokenB = await loginAndGetAccessToken(userB.email, userB.password);

    const projectB = await createProject(tokenB, uniqueSuffix());
    const taskB = await createTask(tokenB, projectB.id, uniqueSuffix());

    const response = await request(app.getHttpServer())
      .patch('/tasks/' + taskB.id)
      .set(authHeader(tokenA))
      .send({
        task: {
          isDone: true,
        },
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Task not found');
  });

  it('2) owner can update own task', async () => {
    const owner = await registerUser('owner2');
    const token = await loginAndGetAccessToken(owner.email, owner.password);

    const project = await createProject(token, uniqueSuffix());
    const task = await createTask(token, project.id, uniqueSuffix());

    const response = await request(app.getHttpServer())
      .patch('/tasks/' + task.id)
      .set(authHeader(token))
      .send({
        task: {
          isDone: true,
        },
      });

    expect(response.status).toBe(206);
    expect(response.body.id).toBe(task.id);
    expect(response.body.isDone).toBe(true);
  });

  it('3) user A cannot read user B notes', async () => {
    const userA = await registerUser('userA3');
    const userB = await registerUser('userB3');

    const tokenA = await loginAndGetAccessToken(userA.email, userA.password);
    const tokenB = await loginAndGetAccessToken(userB.email, userB.password);

    const projectB = await createProject(tokenB, uniqueSuffix());
    const taskB = await createTask(tokenB, projectB.id, uniqueSuffix());
    await createNote(tokenB, projectB.id, taskB.id, uniqueSuffix());

    const response = await request(app.getHttpServer())
      .get('/projects/' + projectB.id + '/tasks/' + taskB.id + '/notes')
      .set(authHeader(tokenA));

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('4) owner can read own notes', async () => {
    const owner = await registerUser('owner4');
    const token = await loginAndGetAccessToken(owner.email, owner.password);

    const project = await createProject(token, uniqueSuffix());
    const task = await createTask(token, project.id, uniqueSuffix());
    await createNote(token, project.id, task.id, uniqueSuffix());

    const response = await request(app.getHttpServer())
      .get('/projects/' + project.id + '/tasks/' + task.id + '/notes')
      .set(authHeader(token));

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  it('5) user A cannot delete user B project', async () => {
    const userA = await registerUser('userA5');
    const userB = await registerUser('userB5');

    const tokenA = await loginAndGetAccessToken(userA.email, userA.password);
    const tokenB = await loginAndGetAccessToken(userB.email, userB.password);

    const projectB = await createProject(tokenB, uniqueSuffix());

    const response = await request(app.getHttpServer())
      .delete('/projects/' + projectB.id)
      .set(authHeader(tokenA));

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Project not found');
  });

  it('6) owner can delete own project', async () => {
    const owner = await registerUser('owner6');
    const token = await loginAndGetAccessToken(owner.email, owner.password);

    const project = await createProject(token, uniqueSuffix());

    const response = await request(app.getHttpServer())
      .delete('/projects/' + project.id)
      .set(authHeader(token));

    expect(response.status).toBe(202);
    expect(response.body.id).toBe(project.id);
  });
});
