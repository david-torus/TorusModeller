import { FaRegUser } from "react-icons/fa";

export default function TorusAvatar({ color, src, borderColor, radius, size }) {
  return (
    <div className=" flex items-center ml-[3px]">
      <div
        className={`
            flex items-center justify-center
            w-10 h-10 
            ${
              radius === "sm"
                ? "rounded-sm"
                : radius === "md"
                ? "rounded-md"
                : radius === "lg"
                ? "rounded-lg"
                : radius === "full"
                ? "rounded-full"
                : ""
            } 

            ${
              size === "sm"
                ? "w-3 h-3"
                : size === "md"
                ? "w-5 h-5"
                : size === "lg"
                ? "w-8 h-8"
                : size === "full"
                ? "w-10 h-10"
                : "w-5 h-5"
            }
            bg-transparent 
            border-2  ${borderColor}`}
      >
        {!src && (
          <FaRegUser
            color={color}
            size={
              size === "sm"
                ? 8
                : size === "md"
                ? 10
                : size === "lg"
                ? 12
                : size === "full"
                ? 15
                : 10
            }
          />
        )}

        {src && (
          <img
            src={src}
            alt="avatar"
            class="inline-block size-8 rounded-full ring-2 ring-white dark:ring-neutral-900"
          />
        )}
      </div>
    </div>
  );
}
