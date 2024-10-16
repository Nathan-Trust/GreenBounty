import React from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Adjust the import path
import { camelCaseToSentenceCase } from "@/utils/text";
import Lottie from "react-lottie";
import emptyProjectAnimationData from "../../../assets/lotties/empty-project.json";

// PROJECT DETAILS SKELETON
interface ProjectDetailsSkeletonProps {
  length: number; // Number of skeletons to render
}

export const ProjectDetailsSkeleton: React.FC<ProjectDetailsSkeletonProps> = ({
  length,
}) => {
  const renderSkeletonItems = Array.from({ length }).map((_, index) => (
    <div key={index} className="flex flex-col">
      <Skeleton className="h-4 w-24 mb-2 mt-2 bg-lightGray" />
      <Skeleton className="h-4 w-32 bg-lightGray" />
    </div>
  ));

  return (
    <div className="col-span-3">
      <div className="grid lg:grid-cols-5 w-full gap-6">
        {renderSkeletonItems}
      </div>
    </div>
  );
};






// PROJECT DETAILS EMPTY STATE
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: emptyProjectAnimationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const ProjectDetailsEmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
};






// PROJECT DETAILS
interface CustomDataObject {
  id: string;
  user: string;
  number: string;
  title: string;
  location: string;
  startDate: string;
  duration: string;
  durationType: string;
  type: string;
}

interface CustomDataDisplayProps {
  customData: CustomDataObject; // Adjust the type based on your data structure
}

export const SingleProjectDataDisplay: React.FC<CustomDataDisplayProps> = ({
  customData,
}) => {
  return (
    <div className="grid lg:grid-cols-5 w-full gap-6">
      {customData &&
        Object.keys(customData).map((key) => (
          <div key={key} className="flex flex-col">
            <p className="font-semibold uppercase text-xs text-lightGray_three">
              {key === "dob"
                ? "Date of Birth"
                : key === "phone"
                ? "Phone Number"
                : camelCaseToSentenceCase(key)}
            </p>
            <p className="text-sm font-medium mt-0.5">
              {customData[key as keyof typeof customData]}
            </p>
          </div>
        ))}
    </div>
  );
};
