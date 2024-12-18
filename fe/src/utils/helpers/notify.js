import { toast } from "react-toastify";

export const notify = (type, message) => {
  switch (type) {
    case "success":
      toast.success(message, { progress: 0, hideProgressBar: true });
      break;
    case "warn":
      toast.warn(message, { progress: 0, hideProgressBar: true });
      break;
    case "error":
      toast.error(message, { progress: 0, hideProgressBar: true });
      break;
    case "info":
      toast.info(message, { progress: 0, hideProgressBar: true });
      break;
    default:
      toast(message, { progress: 0, hideProgressBar: true });
      break;
  }
};
