import { Button } from "react-aria-components";
import { merger } from "../utils/utils";

export default function TorusButton({
  value,
  isDisabled,
  Children,
  autoFocus,
  gap,
  onPress,
  size,
  buttonClassName,
  marginT,
  color,
  outlineColor,
  radius,
  btncolor,
  fontStyle,
  btnTxtSize,
  endContent,
  startContent,
  borderColor,
  isIconOnly,
}) {
  const outlineFn = () => {
    if (outlineColor) {
      return ` torus-hover:ring-2 torus-hover:ring-offset-4  ${outlineColor}`;
    }
    return "outline-none";
  };

  const hoverOutline = outlineFn();
  return (
    <Button
      style={{
        background: btncolor,
        border: borderColor ? borderColor : "",
      }}
      className={merger(
        ` font-lg    ${marginT} border-none  outline-none
         torus-pressed:animate-torusButtonActive 
                    torus-hover:outline-none
                    torus-hover:border-2 
                    ${hoverOutline} ${gap}

                    ${
                      (startContent || endContent) &&
                      "flex justify-center items-center"
                    }
          ${
            radius === "sm"
              ? "rounded-sm"
              : radius === "md"
              ? "rounded-md"
              : radius === "lg"
              ? "rounded-lg"
              : radius === "xl"
              ? "rounded-xl"
              : radius === "full"
              ? "rounded-full"
              : "rounded-lg"
          }
          
      ${
        size === "sm"
          ? "px-1.5 py-0.5"
          : size === "md"
          ? "px-2.5 py-1.5"
          : size === "lg"
          ? "p-3.5 py-2.5"
          : size === "xl"
          ? "px-4.5 py-3.5 "
          : size === "full"
          ? "p-5.5 py-4.5"
          : "px-2.5 py-1.5"
      }
        
          `,
        buttonClassName
      )}
      value={value}
      isDisabled={isDisabled}
      autoFocus={autoFocus}
      onPress={onPress}
    >
      {isIconOnly ? (
        <div className="flex justify-center items-center">{Children}</div>
      ) : startContent ? (
        <div className="w-[100%] flex justify-evenly gap-1">
          <div className="w-[20%] flex justify-center items-center">
            {startContent}
          </div>
          <div className={`${fontStyle} w-[80%] flex justify-center pr-1`}>
            {Children}
          </div>
        </div>
      ) : endContent ? (
        <div className="w-[100%] flex justify-evenly gap-1">
          <div className={`${fontStyle} w-[80%] flex justify-start pr-1`}>
            {Children}
          </div>
          <div className="w-[20%] flex justify-center items-center">
            {endContent}
          </div>
        </div>
      ) : (
        <p className={`${fontStyle}`}>{Children}</p>
      )}
    </Button>
  );
}
