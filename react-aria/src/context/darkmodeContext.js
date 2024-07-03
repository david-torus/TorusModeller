import { createContext, useState } from "react";



export const DarkModeContext = createContext();

export const DarkmodeProvider = ({ children }) => {
    const[darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode((prev)=>!prev)
        document.body.classList.toggle("dark");
    
    }

    return (
    <DarkModeContext.Provider  value={{ darkMode, toggleDarkMode}}  >
        {children}
    </DarkModeContext.Provider>
    )
}