import { Button } from "@nextui-org/react";
import { FiDelete } from "@react-icons/all-files/fi/FiDelete";
import { FiEdit } from "@react-icons/all-files/fi/FiEdit";
import React, { useContext, useEffect, useState } from "react";
import { JsonUiEditorContext } from "../Layout";

export default function DecisionView({ setSelectedDecison, setDecision }) {
  const [firstLevelKeys, setFirstLevelkeys] = useState([]);
  const { json } = useContext(JsonUiEditorContext);

  useEffect(() => {
    setFirstLevelkeys(Object.keys(json));
  }, []);

  return (
    <>
      {firstLevelKeys.length > 0 ? (
        <div className="w-full h-[100%] p-2">
          <div className="w-full max-h-[500px] overflow-y-auto scrollbar-hide">
            {firstLevelKeys.map((fact, index) => (
              <div key={fact}>
                <div
                  className={`mt-3 w-[100%] flex justify-center items-center h-20 border-1 border-slate-800 rounded-sm shadow-md *:
                    ${index % 2 === 0 ? "bg-slate-200" : "bg-slate-300"}

               ${
                 fact.type === "string"
                   ? "border-l-blue-500 border-l-4"
                   : fact.type === "number"
                   ? "border-l-green-500 border-l-4"
                   : fact.type === "boolean"
                   ? "border-l-red-500 border-l-4"
                   : fact.type === "array"
                   ? "border-l-yellow-500 border-l-4"
                   : fact.type === "object"
                   ? "border-l-pink-500 border-l-4"
                   : "border-l-slate-500 border-l-4"
               }
               
               `}
                >
                  <div className="grid grid-cols-12 w-[100%]">
                    <div className="col-span-3 flex justify-center">
                      <div className="w-[50%] flex justify-center items-center font-semibold ">
                        {fact}
                      </div>
                    </div>

                    <div className="col-span-9 flex justify-end">
                      <div className="w-[30%] flex justify-center gap-2">
                        <div className="w-[80%] flex justify-between gap-1">
                          <Button
                            onClick={() => {
                              setSelectedDecison(fact);
                              setDecision(true);
                            }}
                            className="w-[50%] border-purple-400 text-white text-sm font-bold hover:border-purple-500 hover:text-purple-800"
                            isIconOnly
                            variant="bordered"
                          >
                            <FiEdit size={20} color="purple" />
                          </Button>
                          <Button
                            className="w-[50%] border-red-400 text-white text-sm font-bold hover:border-red-500 hover:text-red-800"
                            // onClick={() => removeComponent(fact.id)}
                            variant="bordered"
                          >
                            <FiDelete size={20} color="red" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No keys available</p>
      )}
    </>
  );
}
