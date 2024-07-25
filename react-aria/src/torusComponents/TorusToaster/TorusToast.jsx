import React from "react";
import "./toast.css"; // Ensure this path is correct based on your directory structure
import { useNotificationCenter } from "react-toastify/addons/use-notification-center";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ToastClose,
  ToastError,
  ToastSucess,
  ToastWarning,
} from "../../SVG_Application";

const TorusToast = ({ closeToast, toastProps, setWordLength }) => {
  console.log(toastProps, "ToatProps");
  const [length, setLength] = React.useState(0);

  React.useEffect(() => {
    let count = toastProps?.text?.trim().split(/\s+/).filter(Boolean).length;

    if (count > 0) {
      setWordLength(count);
      setLength(count);
    }
  }, []);

  if (length) {
    const element = document.getElementsByClassName("Toastify__toast-body")[0];

    if (element) {
      element.style.width =
        length <= 30
          ? "20rem"
          : length > 30 && length <= 50
          ? "10rem "
          : length > 50 && length <= 80
          ? "20rem "
          : length > 80 && length <= 130
          ? "25rem "
          : length > 130 && length <= 180
          ? "30rem "
          : length > 180 && length <= 210
          ? "45rem "
          : "8rem ";
    }
  }

  console.log(length, "countWords");

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-[100%] flex justify-between">
        <div className="w-[50%] flex justify-start items-center">
          <div className="w-[10%] flex justify-start items-center">
            {toastProps.type === "success" ? (
              <ToastSucess />
            ) : toastProps.type === "warning" ? (
              <ToastWarning />
            ) : toastProps.type === "error" ? (
              <ToastError />
            ) : null}
          </div>
          <div className="w-[90%] flex justify-start items-center">
            <p className="text-white font-roboto font-medium text-lg ">
              {toastProps.title}
            </p>
          </div>
        </div>
        <div className="w-[50%] flex justify-end items-center">
          <button onClick={closeToast}>
            <ToastClose />
          </button>
        </div>
      </div>
      <div>
        {length <= 30 ? (
          <p className="text-white text-xs font-roboto leading-3">
            {toastProps.text}
          </p>
        ) : length > 30 && length <= 50 ? (
          <p className="text-white text-xs font-roboto leading-3 ">
            {toastProps.text}
          </p>
        ) : length > 50 && length <= 80 ? (
          <p className="text-white text-xs font-roboto leading-3 ">
            {toastProps.text}
          </p>
        ) : length > 80 && length <= 130 ? (
          <p className="text-white text-xs font-roboto leading-3 ">
            {toastProps.text}
          </p>
        ) : length > 130 && length <= 180 ? (
          <p className="text-white text-xs font-roboto leading-3 ">
            {toastProps.text}
          </p>
        ) : length > 180 && length <= 210 ? (
          <p className="text-white text-xs font-roboto leading-3 ">
            {toastProps.text}
          </p>
        ) : (
          <p className="text-white text-xs font-roboto leading-3 ">
            {toastProps.text}
          </p>
        )}
      </div>
    </div>
  );
};

export default TorusToast;
