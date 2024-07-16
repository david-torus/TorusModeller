import { createContext, useEffect, useState } from "react";

const DarkmodeContext = createContext();

function DarkmodeProvider(props) {
  const [darkmode, setDarkmode] = useState(true);

  const toggleDarkmode = () => {
    setDarkmode(!darkmode);
   
  };

  useEffect(()=>{
    props.getContext(darkmode)
  },[darkmode, props])

  return (
    <DarkmodeContext.Provider
      className="w-full h-full"
      value={{ darkmode, toggleDarkmode }}
    >
      {props.children}
    </DarkmodeContext.Provider>
  );
}

export { DarkmodeContext, DarkmodeProvider };
