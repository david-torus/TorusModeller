import { Button } from "react-aria-components";
import PropTypes from "prop-types";
import { merger } from "../commonComponents/utils/utils";
import { TorusAccordianArrow } from "../SVG_Application";
import { useRef } from "react";
import { useState } from "react";

const TorusButton = ({
  value,
  isDisabled = false,
  Children,
  autoFocus = false,
  gap,
  onPress,
  size = "md",
  buttonClassName,
  marginT,
  color,
  outlineColor,
  radius = "lg",
  btncolor,
  fontStyle,
  btnTxtSize,
  endContent,
  startContent,
  borderColor,
  isIconOnly = false,
  isDropDown = false,
}) => {
  const btnRef = useRef(null);
  const [rotateState, setRotateState] = useState(false);
  const outlineFn = () => {
    if (outlineColor) {
      return ` torus-hover:ring-2 torus-hover:ring-offset-4  ${outlineColor}`;
    }
    return "outline-none";
  };

  const hoverOutline = outlineFn();

  const sizeClasses = {
    sm: "px-1.5 py-0.5",
    md: "px-2.5 py-1.5",
    lg: "p-3.5 py-2.5",
    xl: "px-4.5 py-3.5",
    full: "px-5.5 py-4.5",
  };

  const radiusClasses = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };

  const commonClass = `font-lg w-[100%] ${marginT} 
  border-none outline-none torus-pressed:animate-torusButtonActive 
  torus-hover:outline-none torus-hover:border-2 ${hoverOutline} ${gap} ${
    (startContent || endContent) && "flex justify-center items-center"
  } ${radiusClasses[radius] || "rounded-lg"}`;

  const contentClass = sizeClasses[size] || "";

  return (
    <Button
      style={{
        background: btncolor,
        border: borderColor ? borderColor : "",
      }}
      className={merger(commonClass, buttonClassName)}
      value={value}
      isDisabled={isDisabled}
      autoFocus={autoFocus}
      onPress={() => {
        if (onPress) onPress();
      }}
      onFocus={() => {
        setRotateState(true);
      }}
      onBlur={() => {
        setRotateState(true);
      }}
      ref={btnRef}
    >
      {isIconOnly ? (
        <div className={`${contentClass} flex items-center justify-center`}>
          {Children}
        </div>
      ) : startContent ? (
        <div className={`${contentClass} flex items-center justify-center`}>
          <div className="flex w-[100%] justify-evenly gap-1">
            <div className="flex w-[20%] items-center justify-center">
              {startContent}
            </div>
            <div className={`${fontStyle} flex w-[80%] justify-center pr-1`}>
              {Children}
            </div>
          </div>
        </div>
      ) : endContent ? (
        <div className={`${contentClass} flex items-center justify-center`}>
          <div className="flex w-[100%] justify-evenly gap-1">
            <div className={`${fontStyle} flex w-[80%] justify-start pr-1`}>
              {Children}
            </div>
            <div className="flex w-[20%] items-center justify-center">
              {endContent}
            </div>
          </div>
        </div>
      ) : (
        <>
          {isDropDown ? (
            <div
              className={`${contentClass} flex w-[100%] items-center justify-between gap-[0.5rem]`}
            >
              <p className={`w-[80%] ${fontStyle}`}>{Children}</p>
              <div className="flex w-[20%] items-center justify-center">
                <span
                  className={`transition duration-300 ease-in-out 
                    
                    ${rotateState ? "rotate-[-90deg]" : "rotate-[0deg]"}
                    `}
                >
                  <TorusAccordianArrow />
                </span>
              </div>
            </div>
          ) : (
            <p className={`${fontStyle}`}>{Children}</p>
          )}
        </>
      )}
    </Button>
  );
};

TorusButton.propTypes = {
  value: PropTypes.string,
  isDisabled: PropTypes.bool,
  Children: PropTypes.node,
  autoFocus: PropTypes.bool,
  gap: PropTypes.string,
  onPress: PropTypes.func,
  size: PropTypes.oneOf(["sm", "md", "lg", "xl", "full"]),
  buttonClassName: PropTypes.string,
  marginT: PropTypes.string,
  color: PropTypes.string,
  outlineColor: PropTypes.string,
  radius: PropTypes.oneOf(["sm", "md", "lg", "xl", "full"]),
  btncolor: PropTypes.string,
  fontStyle: PropTypes.string,
  btnTxtSize: PropTypes.string,
  endContent: PropTypes.node,
  startContent: PropTypes.node,
  borderColor: PropTypes.string,
  isIconOnly: PropTypes.bool,
};

export default TorusButton;
