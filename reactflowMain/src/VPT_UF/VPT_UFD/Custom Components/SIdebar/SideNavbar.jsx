import React from "react";
import { User, Button} from "@nextui-org/react";

export default function SideNavbar({ height, width, statetrack }) {
  const navItem = [
    "HOME",
    "ABOUT US",
    "CONTACT US",
    "SERVICES",
    "BOOK SESSION",
  ];

  return (
    <React.Fragment>
      <div
        className="flex flex-col justify-between items-center rounded-lg py-7 px-6 shadow-md bg-slate-500"
        style={{
          width: width,
          height: height,
        }}
      >
        <div className="flex flex-col justify-evenly items-start gap-4" style={{width:width}}>
          <div className="pt=[10%]">
            <User name="TORUS" description=" product design tool"></User>
          </div>
          <div className="pt-[20%]">
            {navItem && navItem.length > 0 && navItem.map((item) => (
              <h5>{item}</h5>
            ))}
          </div>

          <div>
            <Button>Log out</Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
