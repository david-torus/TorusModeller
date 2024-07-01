import "./App.css";
import { Button } from "react-aria-components";

export default function ButtonComponent({
  value,
  isDisabled,
  Children,
  autoFocus,
  gap,
}) {
  return (
    <div className="flex items-center justify-center mt-2">
      <Button
        className={`bg-purple-300 font-lg w-[100px] h-[50px] rounded-lg ${gap}
           torus-hover:bg-red-500 torus-focus:outline-none transition-all ease-in-out duration-300`}
        value={value}
        isDisabled={isDisabled}
        autoFocus={autoFocus}
      >
        {Children}
      </Button>
    </div>
  );
}
