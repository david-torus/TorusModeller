import "./App.css";
import Layout from "./Layout";
import { NextUIProvider } from "@nextui-org/react";

function App() {
  return (
    <NextUIProvider>
      <div className="h-[100%] w-full overflow-hidden">
        <div className="w-full h-[100%] bg-slate-400/25  shadow-sm rounded-md">
          <header className="w-full flex justify-center items-center h-[10%]">
            Json Editor
          </header>
          <div className="w-full h-[90%] ">

          <Layout />
          </div>
        </div>
      </div>
    </NextUIProvider>
  );
}

export default App;
