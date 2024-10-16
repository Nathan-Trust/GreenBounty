import { Badge } from "@/components/ui/badge";

export function getStatusColor(status: string): string {
  switch (status) {
    case "Pending":
      return "text-yellow-500";
    case "Approved":
      return "text-green-500";
    case "Rejected":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
}

export type Status = "Active" | "Inactive" | "Deactivated";

export const renderCellContent = (status: Status): JSX.Element => {
  let badgeBgColor = "";

  if (status === "Active") {
    badgeBgColor = "bg-[#bee6a3] hover:bg-[#bee6a3] text-primary ";
  } else if (status === "Inactive") {
    badgeBgColor = "bg-secondary capitalize hover:bg-secondary text-black";
  } else if (status === "Deactivated") {
    badgeBgColor = "bg-lightGray_three hover:bg-lightGray_three";
  }

  return <Badge className={badgeBgColor}>{status}</Badge>;
};



export type ProjectLogsStatus = 'Non Issue' | 'Pending' | 'In Progress'

export const renderProjectLogsCellContent = (
  status: ProjectLogsStatus
): JSX.Element => {
  let badgeBgColor = "";

  if (status === "Non Issue") {
    badgeBgColor = "bg-[#d9d9d9] hover:bg-[#d9d9d9] text-[#3a5574] ";
  } else if (status === "Pending") {
    badgeBgColor = "bg-[#ffcaa4] capitalize hover:bg-[#ffcaa4] text-[#bc682d]";
  } else if (status === "In Progress") {
    badgeBgColor = "bg-lightGray_three hover:bg-lightGray_three";
  }

  return <Badge className={badgeBgColor}>{status}</Badge>;
};
