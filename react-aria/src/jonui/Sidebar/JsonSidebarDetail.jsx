import React, { useState } from "react";

const RenderJsonArraySidebarDetail = ({ obj }) => {
  return (
    <div>
      <select>
        {obj &&
          obj.map((ele) => (
            <option key={ele} value={ele}>
              {ele}
            </option>
          ))}
      </select>
    </div>
  );
};

export default function JsonSidebarDetail({ showObj, obj, handlejs , path }) {
    const[value, setValue] = useState(null)
  const handleInput = (e, i , key , type) => {

   setValue(e);
   if(value){
    handlejs(e, i, key , type)
   }
  };



  return (
    <div className="font-semibold p-2 text-sm">
      Properties
      <div>
        {showObj && (
          <>
            {obj[showObj]
              ? obj &&
                showObj &&
                Object.keys(obj[showObj]).map((ele) => {
                  if (Array.isArray(obj[showObj][ele]))
                    return (
                      <RenderJsonArraySidebarDetail obj={obj[showObj][ele]} />
                    );
                  else
                    return (
                      <p style={{ display: ele === "label" ? "none" : "" }}>
                        {ele} :
                        <input
                          className="border text-orange-500 "
                          type="text"
                          value={obj[showObj][ele]}
                          onChange={(e) =>
                            handleInput(e.target.value, path , ele , "obj")
                          }
                        />
                      </p>
                    );
                })
              : showObj &&
                Object.keys(showObj).map((ele ,index) => {
                  if (!Array.isArray(showObj[ele]))
                    return (
                      <p style={{ display: ele === "label" ? "none" : "" }} key={path + "."+ele}>
                        
                        {ele} :
                         <input
                          className="border text-blue-500 "
                          type="text"
                          defaultValue={showObj[ele]}
                          onChange={(e) =>
                            handleInput(e.target.value, path + "."+ele ,"", "arr" )
                          }
                        />
                      </p>
                    );
                  else if (Array.isArray(showObj[ele]))
                    return <RenderJsonArraySidebarDetail obj={showObj[ele]} />;
                  else if (typeof showObj[ele] == "object")
                    return (
                      <p>
                        {ele} : {showObj[ele].label}
                      </p>
                    );
                })}
          </>
        )}
      </div>
    </div>
  );
}
