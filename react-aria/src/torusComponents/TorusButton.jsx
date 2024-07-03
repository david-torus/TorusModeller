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
}) {
  return (
    <Button
      className={merger(
        `bg-purple-300 font-lg w-[${width}] h-[${height}]  ${marginT}   rounded-lg ${gap}
        torus-focus:outline-none transition-all ease-in-out duration-300`,
        buttonClassName
      )}
      value={value}
      isDisabled={isDisabled}
      autoFocus={autoFocus}
      onPress={onPress}
    >
      {Children}
    </Button>
  );
}
