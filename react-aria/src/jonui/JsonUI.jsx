import { useEffect, useState } from "react";
import FabricsSideBar from "../sidebars/fabricsSideBar/FabricsSideBar";
import JsonSidebar from "./Sidebar/JsonSidebar";
import _, { set } from "lodash";

const js = {
  root: {
    label: "root",
    name: "Alice",
  },
  contacts: [
    {
      label: "Contact Info",
      type: "email",
      value: "alice@example.com",
      arr: ["1", "2"],
    },
    {
      label: "phone",
      type: "phone",
      value: "123-456-7890",
      arr: ["a", "b"],
    },
  ],

  "contacts/0/obj": {
    label: "contact obj",
    key: "value",
  },

  "contacts/0/arrobj": [
    {
      label: "contact arrobj",
      key: "value",
    },
  ],
  "contacts/0/arrobj/0/nestedObj": {
    label: "nestobj",
    key: "value",
  },
  "contacts/1/obj": {
    label: "contacts obj",
    key: "value",
  },
  "contacts/1/arrobj": [
    {
      label: "contacts-arrobj",
      key: "value",
    },
    {
      label: "contacts(2)-arrobj",
      key: "value",
    },
  ],
  "contacts/1/arrobj/0/nestedObj": {
    label: "contacts nestedObj",
    key: "value",
  },
  metadata: {
    label: "Meta Data",
    createdAt: "2021-01-01T00:00:00Z",
    updatedAt: "2023-01-01T12:00:00Z",
    tags: ["user", "premium"],
  },
};

const RenderObject = ({ obj,handlejs  }) => {


  return (
    <>
      {obj && <JsonSidebar obj={obj} handlejs={handlejs}  />}
    </>
  );
};

export const RenderJson = () => {
  const [dupJson, setDupJson] = useState(structuredClone(js));

  const handlejs = (e, i,key , type) => {
    console.log(e, i,key, type,"rendertype");

    if(type=="obj"){

        setDupJson((prev) => {
          return {
            ...prev,
           [i]:{
            ...prev[i],
            [key]:e
           }
          };
        });
    }
    else{
        if (i) {
            const js = structuredClone(dupJson);
            _.set(js, i, e);
            setDupJson(js);
            console.log(js, "arrjs");
          }

    }
   
};
console.log(dupJson, "renderjs");

 

  return (
    <>
      {dupJson && Object.keys(dupJson).length > 0 && (
        <>
          <div className="main">
            {Object.keys(dupJson).length > 0 && <RenderObject obj={dupJson}   handlejs={handlejs} />}
          </div>
        </>
      )}
    </>
  );
};
