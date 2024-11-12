import { logger } from "@/utils/logger";
import { successToast, errorToast } from "@/utils/toast";

const useCopyToClipboard = () => {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      successToast({
        title: "Copy Success",
        message: "Text copied to clipboard successfully!",
      });
    } catch (error) {
      logger("Copy failed", error);
      errorToast({
        title: "Copy Failed",
        message: "Failed to copy text. Please try again.",
      });
    }
  };

  return { copyToClipboard };
};
export default useCopyToClipboard;
