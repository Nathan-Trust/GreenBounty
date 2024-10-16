import { useQuery } from "@tanstack/react-query";
import { QueryKeys, QueryErrCodes } from "@/models/query";
import { errorToast, successToast } from "@/utils/toast";
import { ProjectService } from "@/services/project";
import { useEffect } from "react";

// Custom hook to fetch all projects for a given user
export const useFetchProjects = ({ userId }: { userId: string }) => {
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: [QueryKeys.Get_All_Projects, userId],
    queryFn: () => ProjectService.fetchProjectsById(userId),
    enabled: !!userId,
    meta: {
      errCode: QueryErrCodes.GetAllProjects,
    },
  });

  useEffect(() => {
    if (isSuccess) {
      successToast({
        title: "Projects Loaded",
        message: "All project data has been successfully loaded.",
      });
    }

    if (isError) {
      errorToast({
        title: "Fetch Error",
        message:
          "An error occurred while fetching project data. Please try again.",
      });
    }
  }, [isSuccess, isError]);

  return {
    data,
    isLoading,
  };
};




// FETCH SINGLE PROJECT BY PROJECT ID
interface UseFetchProjectByIdProps {
  projectId: string;
}

export const useFetchProjectById = ({
  projectId,
}: UseFetchProjectByIdProps) => {
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: [QueryKeys.Get_Project_By_Id, projectId],
    queryFn: () => ProjectService.fetchProjectById( projectId),
    enabled: !!projectId,
    meta: {
      errCode: QueryErrCodes.GetProjectById,
    },
  });

  if (isSuccess) {
    successToast({
      title: "Project Loaded",
      message: "Project data has been successfully loaded.",
    });
  }

  if (isError) {
    errorToast({
      title: "Fetch Error",
      message:
        "An error occurred while fetching project data. Please try again.",
    });
  }

  return {
    data,
    isLoading,
  };
};


//FETCH PROJECT LOGS
export const useFetchProjectLogs = ({
  projectId,
}: UseFetchProjectByIdProps) => {
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: [QueryKeys.Get_Project_Logs_By_Id, projectId],
    queryFn: () => ProjectService.fetchProjectLogsById(projectId),
    enabled: !!projectId,
    meta: {
      errCode: QueryErrCodes.GetProjectLogsById,
    },
  });

  if (isSuccess) {
    successToast({
      title: "Project Logs Loaded",
      message: "Project logs has been successfully loaded.",
    });
  }

  if (isError) {
    errorToast({
      title: "Fetch Error",
      message:
        "An error occurred while fetching project logs. Please try again.",
    });
  }

  return {
    data,
    isLoading,
  };
};



