import React, { useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";


const RenderSwitch = ({ obj }) => {
  const handleDropdownClick = (event) => {
    event.stopPropagation(); 
  };
  return (
    <div>
      <select onClick={handleDropdownClick}>
        {obj &&
          obj.map((ele) => (
           {ele}
          ))}
      </select>
    </div>
  );
};

const RenderDropdown = ({ obj , path ,item , handlejs , showObj }) => {
  const[value, setValue] = useState(null);
  const handleDropdownClick = (event) => {
    event.stopPropagation(); 
  };

  const handleDropdownChange = (event) => {
    setValue(event.target.value);
    if(value){
      handlejs(event.target.value, path+"."+item , item, "dropdown" , showObj);
    }
  };

  console.log(obj , item , value,  path+"."+item, showObj, "handleDropdownChange");
  return (
    <div className="flex gap-2 items-center">
      {item}:
      <select onClick={handleDropdownClick} onChange={handleDropdownChange} className="border">
        {obj &&
          obj.map((ele) => (
            <option key={ele} value={ele} >
              {ele}
            </option>
          ))}
      </select>
    </div>
  );
};


const RenderJsonArraySidebarDetail = ({
  obj,
  showObj,
  path,
  handlejs,
  objs
}) => {
  const [expandedItem, setExpandedItem] = useState([]);
  const [showAccordianItem, setShowAccordianItem] = useState(null);
  const[value, setValue] = useState(null);
  const handleInput = (e, i, key, type) => {
    console.log(e.target.value, i, key, type, "renderinput");
    setValue(e.target.value);
    if (value) {
      handlejs(e.target.value, i, key, type ,showObj);
    }
  };

  const toggleKey = (key) => {
    if (expandedItem.includes(key)) {
      setExpandedItem(expandedItem.filter((k) => k !== key));
    } else {
      setExpandedItem([...expandedItem, key]);
    }
  };

  return (
    <div>
      {obj &&
        obj.map((ele, index) => {
          const isExpanded = expandedItem.includes(ele.label);
          return (
            <div
              key={index}
            >
              <p className="cursor-pointer flex items-center gap-2"   onClick={(e) => {
                setShowAccordianItem(ele);
                e.stopPropagation(); 
                toggleKey(ele.label);
                // if (expandedItem === ele.label) {
                //   setExpandedItem(null); 
                // } else {
                //   setExpandedItem(ele.label); 
                // }

              }}>
                {ele.label}
                <span
                
                >
                   {isExpanded ? (
                    <MdExpandLess color="gray" />
                  ) : (
                    <MdExpandMore color="gray" />
                  )}
                </span>
              </p>
              { isExpanded && (
                <div>
                  {objs &&
                    Object.keys(objs[showObj][index]).filter((item)=>item!=="label").map((item, inds) => {
                      if (!Array.isArray(objs[showObj][index][item])) {
                        return (
                          <p className="flex gap-2 mb-2 items-center" >
                            {item} :
                            <input
                              className="border text-blue-500 "
                              type="text"
                              Value={objs[showObj][index][item]}
                              onChange={(e) =>
                              {
                                handleInput(
                                  e,
                                  path + "." + index + "." + item,
                                  item,
                                  "arr"
                                
                                )
                              }
                              }
                            />
                          </p>
                        );
                      }

                     
                      if (Array.isArray(objs[showObj][index][item])) {
                        return (
                          <>
                           
                            <RenderDropdown obj={objs[showObj][index][item]} item={item} path ={path + "." + index } handlejs={handlejs} showObj={showObj} />
                          </>
                        );
                      }
                      if(typeof objs[showObj][index][item] === "boolean" ){
                        <RenderSwitch obj={objs[showObj][index][item]} />
                      }
                    })}
                </div>
              )}
            </div>
          );
        })}



      {/* 
      {obj && (
        <>
          {obj && obj.map((ele, index) => {
            {
              console.log(ele, "ele-<");
            }
            return (
              <div key={index}>
                <p
                  onClick={() => setShowAccordianItem(ele) }
                  className="cursor-pointer"
                >
                  {ele.label}
                </p>
              </div>
            );
          })}

           {
           showAccordianItem &&
            Object.keys(showAccordianItem).map((item, inds) => {
              if (!Array.isArray(showAccordianItem[item])) {
                return (
                  <p >
                  {item} :
                  <input
                    className="border text-blue-500 "
                    type="text"
                    Value={showAccordianItem[item]}
                   
                  />
                </p> 
              
                );
              }
            })} 
        </>
      )} */}


      {/* <select>
        {obj &&
          obj.map((ele) => (
            <option key={ele} value={ele}>
              {ele}
            </option>
          ))}
      </select> */}

      
    </div>
  );
};

export default function JsonSidebarDetail({
  showObj,
  obj,
  handlejs,
  path,
}) {
  const [value, setValue] = useState(null);

  const handleInput = (e, i, key, type) => {
    setValue(e);
    if (value) {
      handlejs(e, i, key, type , showObj);
    }
  };

  return (
    <div className="font-semibold p-2 text-sm">
      Properties
      <div>
        {showObj && (
          <>
            {
              !Array.isArray(obj[showObj]) ? (
                obj &&
                showObj &&
                Object.keys(obj[showObj]).map((ele) => {
                  if (!Array.isArray(obj[showObj][ele])) {
                    return (
                      <p style={{ display: ele === "label" ? "none" : "" }}>
                        {ele} :
                        <input
                          className="border text-orange-500 "
                          type="text"
                          value={obj[showObj][ele]}
                          onChange={(e) =>
                            handleInput(e.target.value, path, ele, "obj")
                          }
                        />
                      </p>
                    );
                  }
                  if (Array.isArray(obj[showObj][ele])) {
                    return <RenderDropdown obj={obj[showObj][ele]}  item={ele} path ={path} handlejs={handlejs} showObj={showObj} />;
                  }
                })
              ) : (
                <RenderJsonArraySidebarDetail
                  obj={obj[showObj]}
                  showObj={showObj}
                  path={path}
                  handlejs={handlejs}
                  objs={obj}
                />
              )
              // showObj &&
              //   Object.keys(showObj).map((ele ,index) => {
              //     if (!Array.isArray(showObj[ele]))
              //       return (
              //         <p style={{ display: ele === "label" ? "none" : "" }} key={path + "."+ele}>

              //           {ele} :
              //            <input
              //             className="border text-blue-500 "
              //             type="text"
              //             defaultValue={showObj[ele]}
              //             onChange={(e) =>
              //               handleInput(e.target.value, path + "."+ele ,"", "arr" )
              //             }
              //           />
              //         </p>
              //       );
              //     else if (Array.isArray(showObj[ele]))
              //       return <RenderJsonArraySidebarDetail obj={showObj[ele]} />;
              //     else if (typeof showObj[ele] == "object")
              //       return (
              //         <p>
              //           {ele} : {showObj[ele].label}
              //         </p>
              //       );
              //   })
            }
          </>
        )}
      </div>
    </div>
  );
}
