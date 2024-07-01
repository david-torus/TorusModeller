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
}) {
  return (
    <div className="flex items-center justify-center mt-2">
      <Button
        className={`bg-purple-300 font-lg w-[${width}] h-[${height}]  torus-pressed:w-[${pressedWidth}] torus-pressed:h-[${pressedHeight}] rounded-lg ${gap}
           torus-focus:outline-none transition-all ease-in-out duration-300`}
        value={value}
        isDisabled={isDisabled}
        autoFocus={autoFocus}
        onPress={onPress}
      >
        {Children}
      </Button>
    </div>
  );
}
