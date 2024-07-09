import { Button } from "react-aria-components";
import { merger } from "../utils/utils";

export default function TorusButton({
  value,
  isDisabled,
  Children,
  autoFocus,
  gap,
  onPress,
  width,
  height,
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
        backgroundColor: btncolor,
      }}
      className={merger(
        ` font-lg    ${marginT} border-none  outline-none
         torus-pressed:animate-torusButtonActive 
                    torus-hover:outline-none
                    torus-hover:border-2 
                    ${hoverOutline}
                    
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
             width === "xs"
               ? "w-[20%]"
               : width === "sm"
               ? "w-[30%]"
               : width === "md"
               ? "w-[45%]"
               : width === "lg"
               ? "w-[60%]"
               : width === "xl"
               ? "w-[75%]"
               : width === "full"
               ? "w-[100%]"
               : "w-[80%]"
           } 

           ${
             height === "xs"
               ? "h-6"
               : height === "sm"
               ? "h-8"
               : height === "md"
               ? "h-10"
               : height === "lg"
               ? "h-20"
               : height === "xl"
               ? "h-25"
               : height === "full"
               ? "h-28"
               : "h-5"
           } 
        
          `,
        buttonClassName
      )}
      value={value}
      isDisabled={isDisabled}
      autoFocus={autoFocus}
      onPress={onPress}
    >
      {startContent ? (
        <div className={`flex justify-evenly gap-1 ${gap}`}>
          <div className="w-[20%] flex justify-center items-center">
            {startContent}
          </div>
          <div className={`${fontStyle} w-[80%]`}>{Children}</div>
        </div>
      ) : (
        endContent && (
          <div className={`flex justify-evenly gap-1 ${gap}`}>
            <div className={`${fontStyle} w-[80%]`}>{Children}</div>
            <div className="w-[20%] flex justify-center items-center">
              {endContent}
            </div>
          </div>
        )
      )}

      {!startContent && !endContent && (
        <div
          style={{ color: color }}
          className={`${fontStyle} flex justify-center gap-1 ${gap}`}
        >
          {Children}
        </div>
      )}
    </Button>
  );
}
