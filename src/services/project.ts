import axiosInstance from "@/api/axiosInstance";
import { APIs } from "./API";

export type Project = {
  _id: string;
  project_number: string;
  project_name: string;
  location: string;
  start_date: string;
  duration: string;
  project_type: string;
  project_role: string;
  description: string;
  user_id: string;
  created_at: string;
};

export type ProjectLogs = {
  log_title: string;
  log_type: string;
  images: string[];
  issues: string;
  description: string;
  user_id: string;
  created_at: string;
};


export class ProjectService {
  // Fetch Project by ID
  static async fetchProjectsById(userId: string): Promise<Project[]> {
    const url = APIs.fetchProjects.url;
    const endpoint = typeof url === "function" ? url({ userId }) : url;

    const response = await axiosInstance.get(endpoint);
    return response.data.projects;
  }

  // Fetch a specific project by project ID
  static async fetchProjectById(projectId: string): Promise<Project> {
    const url = APIs.fetchProject.url;
    const endpoint = typeof url === "function" ? url({ projectId }) : url;

    const response = await axiosInstance.get(endpoint);
    return response.data.project;
  }

  // Fetch a specific project logs by  project ID
  static async fetchProjectLogsById(projectId: string): Promise<ProjectLogs[]> {
    const url = APIs.fetchProjectLogs.url;
    const endpoint = typeof url === "function" ? url({ projectId }) : url;

    const response = await axiosInstance.get(endpoint);
    return response.data.logs;
  }
}
