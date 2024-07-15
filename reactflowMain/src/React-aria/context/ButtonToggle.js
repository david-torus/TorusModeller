import { useContext } from "react";
import { DarkModeContext } from "./darkmodeContext";
import { IoMdMoon, IoMdSunny } from "react-icons/io";

const ButtonToggle = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

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
