import { useState } from "react";
import "./App.css";
import SideMenu from "./components/sidemenu";
import Home from "./components/home";

function App() {
  return (
    <div className="flex w-full">
      {/* <div className="min-w-30% bg-blue-100">
        <SideMenu />
      </div> */}
      <div className="min-w-70%">
        <Home />
      </div>
    </div>
  );
}

export default App;
