import { FaRegUser } from "react-icons/fa";

export default function TorusAvatar({ color, src, borderColor, radius, size }) {
  return (
    <div
      className={`
            flex items-center justify-center
           
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
                ? "h-3 w-3"
                : size === "md"
                  ? "h-5 w-5"
                  : size === "lg"
                    ? "h-8 w-8"
                    : size === "full"
                      ? "h-full w-full"
                      : "h-5 w-5"
            }
            border-2 
            bg-transparent  ${borderColor}`}
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
  );
}
