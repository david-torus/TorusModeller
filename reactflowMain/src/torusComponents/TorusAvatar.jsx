import { FaRegUser } from "react-icons/fa";

export default function TorusAvatar({ color, src, borderColor, radius, size }) {
  // Determine if src is an array and slice the first four items
  const isArray = Array.isArray(src);
  const displaySrc = isArray ? src.slice(0, 4) : [src];
  const remainingCount = isArray ? src.length - 4 : 0;

  return (
    <div className="flex items-center -space-x-3">
      {displaySrc.map((source, index) => (
        <div
          key={index}
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
            bg-transparent ${borderColor}
          `}
        >
          {!source && (
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

          {source && (
            <img
              src={source}
              alt="avatar"
              className="inline-block h-[100%] w-[100%] rounded-full ring-2 ring-white dark:ring-neutral-900"
            />
          )}
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className={`
            flex h-5 w-5
            items-center justify-center
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
            bg-[#0736C4] ${borderColor}
          `}
        >
          <span className="text-xs font-medium text-white font-inter">
            +{remainingCount}
          </span>
        </div>
      )}
    </div>
  );
}
