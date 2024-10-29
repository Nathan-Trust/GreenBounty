export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// Modify the ApiRouteType to support dynamic URL generation
export interface ApiRouteType {
  method?: Method;
  url: string | ((params: Record<string, string | number>) => string);
}


export interface ApiError {
  response?: {
    data?: {
      message?: string;
      error?: string;
      statusCode?: number;
    };
  };
}
