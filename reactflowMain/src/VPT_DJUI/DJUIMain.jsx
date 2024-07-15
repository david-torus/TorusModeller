import React, { useContext, useState } from "react";
import Main from "./experimentalComponents/main";
import { FabricContext } from "../commonComponents/App&FabricSelection/Fabrics";
import { BsBack } from "react-icons/bs";
const js = {
  data: [
    {
      mg1: [
        {
          mi1: {
            df: {
              modelkey: "",
              version: "",
              roles: "",
            },
            uf: {
              modelkey: "",
              version: "",
              roles: "",
            },
            pf: {
              modelkey: "",
              version: "",
              dfroles: "",
            },
            miroles: [],
          },
          mi2: {
            df: {
              modelkey: "",
              version: "",
              roles: "",
            },
            uf: {
              modelkey: "",
              version: "",
              roles: "",
            },
            pf: {
              modelkey: "",
              version: "",
              dfroles: "",
            },
            miroles: [],
          },
          mi3: {
            df: {
              modelkey: "",
              version: "",
              roles: "",
            },
            uf: {
              modelkey: "",
              version: "",
              roles: "",
            },
            pf: {
              modelkey: "",
              version: "",
              dfroles: "",
            },
            miroles: [],
          },
        },
      ],
      mg2: [
        {
          mi1: {
            df: {
              modelkey: "",
              version: "",
              roles: "",
            },
            uf: {
              modelkey: "",
              version: "",
              roles: "",
            },
            pf: {
              modelkey: "",
              version: "",
              dfroles: "",
            },
            miroles: [],
          },
          mi2: {
            df: {
              modelkey: "",
              version: "",
              roles: "",
            },
            uf: {
              modelkey: "",
              version: "",
              roles: "",
            },
            pf: {
              modelkey: "",
              version: "",
              dfroles: "",
            },
            miroles: [],
          },
          mi3: {
            df: {
              modelkey: "",
              version: "",
              roles: "",
            },
            uf: {
              modelkey: "",
              version: "",
              roles: "",
            },
            pf: {
              modelkey: "",
              version: "",
              dfroles: "",
            },
            miroles: [],
          },
        },
      ],
    },
  ],
};
export default function DJUIMain() {
  const [visiblity, setVisiblity] = useState(js);
  const setSelectedFabric = useContext(FabricContext);

  return (
    <div className="bg-white w-full h-full">
      <span onClick={() => setSelectedFabric(null)}>
        <BsBack />
      </span>
      <div className="w-full h-[95%]">
        <Main json={visiblity} setjson={setVisiblity} />
      </div>
    </div>
  );
}
