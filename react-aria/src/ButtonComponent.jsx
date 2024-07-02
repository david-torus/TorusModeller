import "./App.css";
import { Button } from "react-aria-components";

export default function ButtonComponent({
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
}) {
  return (
    <Button
      className={
        `bg-purple-300 font-lg w-[${width}] h-[${height}]     rounded-lg ${gap}
           torus-focus:outline-none transition-all ease-in-out duration-300 ` +
        buttonClassName
      }
      value={value}
      isDisabled={isDisabled}
      autoFocus={autoFocus}
      onPress={onPress}
    >
      {Children}
    </Button>
  );
}
