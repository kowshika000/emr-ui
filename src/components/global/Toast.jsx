import { toast } from "react-toastify";

export const showToast = (messages, type = "info") => {
  const toastContent = <ToastMessage messages={messages} />;

  const toastOptions = {
    autoClose: 10000,
  };

  switch (type) {
    case "success":
      toast.success(toastContent, toastOptions);
      break;
    case "error":
      toast.error(toastContent, toastOptions);
      break;
    case "warning":
      toast.warn(toastContent, toastOptions);
      break;
    case "info":
    default:
      toast.info(toastContent, toastOptions);
      break;
  }
};

const ToastMessage = ({ messages }) => {
  const messageArray = Array.isArray(messages) ? messages : [messages];
  return (
    <div>
      {messageArray?.map((message, i) => (
        <ul key={`${message}_${i}`}>
          <li>{message}</li>
        </ul>
      ))}
    </div>
  );
};

export default ToastMessage;
