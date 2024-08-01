import { createContext, useEffect, useState } from "react";

const DarkmodeContext = createContext();

function DarkmodeProvider(props) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.body.classList.toggle("dark");
  };

  useEffect(()=>{
    props.getContext(darkMode)
  },[darkMode, props])

  return (
    <DarkmodeContext.Provider
      className="w-full h-full"
      value={{ darkMode, toggleDarkMode }}
    >
      {props.children}
    </DarkmodeContext.Provider>
  );
}

export { DarkmodeContext, DarkmodeProvider };
