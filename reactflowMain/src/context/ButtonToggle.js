import { useContext } from "react";
import { DarkmodeContext } from "./darkmodeContext";
import { IoMdMoon, IoMdSunny } from "react-icons/io";

const ButtonToggle = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkmodeContext);

  return (
    <>
      <button onClick={() => toggleDarkMode()}>
        {darkMode && <IoMdSunny />}
        {!darkMode && <IoMdMoon />}
      </button>
    </>
  );
};

export default ButtonToggle;
