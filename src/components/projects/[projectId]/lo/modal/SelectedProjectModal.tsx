import { X } from "lucide-react";
import { motion } from "framer-motion";
import { ProjectLogs } from "@/services/project";
import { errorToast } from "@/utils/toast";
import { formatDate } from "@/utils/date";

interface SelectedProjectModalProps {
  selectedRowId: string;
  closeDialog: () => void;
  projectLogs?: ProjectLogs[];
}

const SelectedProjectModal = ({
  selectedRowId,
  closeDialog,
  projectLogs,
}: SelectedProjectModalProps) => {
  const filteredData = projectLogs?.find(
    (project) => project?.log_title === selectedRowId
  );

  if (!filteredData) {
    errorToast({
      title: "Error",
      message: "Log not found",
    });
    closeDialog();
    return null;
  }

  const fieldsToDisplay = [
    { key: "logNumber", label: "Log Number" },
    { key: "log_title", label: "Log Title" },
    { key: "log_type", label: "Log Type" },
    { key: "duration", label: "Duration" },
    { key: "dateCreated", label: "Date Created" },
    { key: "dateModified", label: "Date Modified" },
    { key: "created_at", label: "Created By" },
    { key: "user_id", label: "Modified By" },
  ];

  return (
    <div
      className="fixed flex items-center justify-center backdrop-blur-sm bg-transparent w-full h-full top-0 left-0 z-50"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-lg flex flex-col  w-[350px] h-[550px] mini-md:w-[400px] md:w-[500px] bg-card text-card-foreground shadow-lg overflow-y-scroll relative"
      >
        <X className="absolute right-2 top-3" onClick={() => closeDialog()} />
        <div className="p-4 bg-[#f7f7f7]">
          <p className="font-medium mt-4">Log {filteredData?.user_id ?? ""}</p>
          <div className="grid md:grid-cols-3 w-full mt-4 gap-6">
            {filteredData &&
              fieldsToDisplay.map(({ key, label }) => (
                <div key={key} className="flex flex-col w-full">
                  <p className="font-semibold uppercase text-xs text-lightGray_three">
                    {label}
                  </p>
                  <p className="text-sm font-medium mt-0.5">
                    {key === "created_at" ||
                    key === "dateCreated" ||
                    key === "dateModified"
                      ? formatDate(
                          filteredData[
                            key as keyof typeof filteredData
                          ] as string
                        ) // Apply formatDate for date fields
                      : filteredData[key as keyof typeof filteredData]}{" "}
                  </p>
                </div>
              ))}
          </div>
        </div>
        <div className="h-[750px]  w-full p-3">
          <p className="text-xs text-lightGray_three">Description</p>
          <p className="text-sm">{filteredData?.description}</p>
          <div className="mt-6  gallery">
            {filteredData?.images?.map((image) => (
              <div
                key={image}
                className="pics relative overflow-hidden group rounded-md"
              >
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  style={{ width: "100%" }}
                  className="group-hover:scale-150 transition-transform duration-300 ease-in-out"
                />
                <div className="absolute inset-0 z-10 w-full h-full hero-gradient" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SelectedProjectModal;
