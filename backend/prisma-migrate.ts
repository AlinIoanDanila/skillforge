import ChildProcess from 'node:child_process';

let message = '';
process.argv.forEach((element, index) => {
  if (element === '-m' && process.argv[index + 1]) {
    console.log(element, process.argv[index + 1]);
    message = process.argv[index + 1].split(' ').join('_');
    return;
  }
});

const execArg = message || 'empty_message_migration';

ChildProcess.execSync('npx prisma migrate dev --name ' + execArg, {
  stdio: [0, 1, 2],
});
