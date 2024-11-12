export const queryText = (message: string) => `Failed to fetch ${message}`;

export class QueryKeys {
  // User
  static  Get_Current_User = "get_current_user";
  // Projects
  static readonly Get_All_Projects = "Get_All_Projects";
  static readonly Get_Project_By_Id = "Get_Project_By_Id";
  static readonly Get_Project_Logs_By_Id = "Get_Project_Logs_By_Id";
}

// src/api/endpoints.ts
export class ApiEndpoints {
  static readonly LOGIN = "/auth/login";
  static readonly USER = "/auth/user";
  // Add other endpoints as needed
}

export class QueryErrCodes {
  static readonly GetCurrentUser = queryText("profile information");
  static readonly GetAllProjects = queryText("all projects");
  static readonly GetProjectById = queryText("project details"); 
  static readonly GetProjectLogsById = queryText("project logs")
}
