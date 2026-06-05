"use client";

import { useEffect } from "react";
import { useProjects } from "@/features/auth/hooks";

const DashboardPage = () => {
  const { error, isLoading, projects } = useProjects();

  useEffect(() => {
    console.log(projects);
  }, []);

  return (
    <p>
      Dashboard page
      <button>Get data</button>
    </p>
  );
};

export default DashboardPage;
