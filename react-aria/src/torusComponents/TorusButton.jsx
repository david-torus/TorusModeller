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
  pressedWidth,
  pressedHeight,
  buttonClassName,
  marginT,
  color,
  bgColor,
  outlineColor,
  radius,
  fontStyle,
  
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
      className={merger(
        `${bgColor} font-lg    ${marginT} border-none  outline-none ${gap}
         torus-pressed:animate-torusButtonActive 
                    torus-hover:outline-none
                    torus-hover:scale-95
                    transition-scale ease-in-out duration-300
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
             width === "sm"
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
            height === "sm"
              ? "h-6"
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
      <div style={{ color: color }} className={`${fontStyle}`}>{Children}</div>
    </Button>
  );
}
