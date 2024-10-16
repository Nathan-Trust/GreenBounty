import { ProjectTabItems } from "@/store/single-project";
import { cn } from "@/lib/utils";
import { Green_Bounty_Routes } from "@/store/route";
import { Link } from "react-router-dom";

interface Props {
  item: ProjectTabItems;
  isActive: boolean;
  projectId: string;
}

export const ProjectsTab = ({ isActive, item, projectId }: Props) => {
  return (
    <Link
      key={item}
      to={Green_Bounty_Routes.project(projectId, item)}
      className="h-full w-full md:w-fit"
    >
      <h3
        className={cn(
          " font-semibold text-sm capitalize  h-14  md:w-[80px] justify-center flex items-center duration-150 transition-all ease-linear",
          isActive ? " border-b-4  border-primary" : ""
        )}
      >
        {item}
      </h3>
    </Link>
  );
};
