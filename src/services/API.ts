import { ApiRouteType } from "@/models/serviceRequest";

export const APIs = {
  // Authentication
  login: {
    method: "POST" as const,
    url: `/auth/login`,
  } as ApiRouteType,

  register: {
    url: `/auth/register`,
  } as ApiRouteType,

  resetPassword: {
    method: "POST" as const,
    url: `/reset`,
  } as ApiRouteType,
  // User
  getCurrentUser: {
    method: "GET" as const,
    url:  `/user`,
  } as ApiRouteType,

  // Projects (New Route Added)
  fetchProjects: {
    method: "GET" as const,
    url: ({ userId }: { userId: string }) => `/fetchprojects/${userId}`,
  } as ApiRouteType,

  //Project by id
  fetchProject: {
    method: "GET" as const,
    url: ({ projectId }: { projectId: string }) =>
      `/projectdetails/${projectId}`,
  } as ApiRouteType,

  //Project Logs
  fetchProjectLogs: {
    method: "GET" as const,
    url: ({ projectId }: { projectId: string }) => `/fetchlogs/${projectId}`,
  } as ApiRouteType,
};
