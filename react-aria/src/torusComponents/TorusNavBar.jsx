import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Breadcrumb, Breadcrumbs } from "react-aria-components";
import TorusButton from "./TorusButton";
import TorusAvatar from "./TorusAvatar";
import { MdDataArray, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { TorusLogo } from "../SVG_Application";
import { Link } from "react-router-dom";
import App from "../App";

// import "../utils/nav.css";

const defaultTropdownClassNames = {
  buttonClassName: `torus-pressed:animate-torusButtonActive 
  `,
  popoverClassName:
    "torus-entering:animate-torusPopOverOpen torus-exiting:animate-torusPopOverClose w-40",
  dialogClassName: "outline-none w-full",
  listBoxClassName:
    "w-full bg-slate-200 border-2 border-gray-300 transition-all p-1 rounded-md gap-1 flex flex-col items-center",
  listBoxItemClassName:
    "p-1 w-full torus-focus:outline-none torus-hover:bg-blue-300 rounded-md cursor-pointer transition-colors duration-300",
};

const menus = [
  {
    id: "1",
    title: "Master",
    sortOrder: "2",
    type: "group",
    items: [
      {
        id: "21",
        title: "Bank",
        link: "/",
        sortOrder: "1",
        type: "item",
        items: [],
        keys: {
          df: "ABC:CG:mvp:DF:bankinghub:v2",
          uf: "ABC:CG:mvp:UF:bank:v2",
          sf: "ABC:CG:mvp:SF:bank:v1",
        },
      },
      {
        id: "32",
        title: "Branch",
        sortOrder: "2",
        type: "item",
        items: [
          {
            id: "33",
            title: "Profile",
            sortOrder: "1",
            type: "group",
            items: [
              {
                id: "34",
                link: "www.google.com",
                title: "Test",
                sortOrder: "1",
                type: "item",
                items: [
                  {
                    id: "35",
                    link: "www.google.com",
                    title: "Testsadasd",
                    sortOrder: "1",
                    type: "item",
                    items: [
                      {
                        id: "473",
                        title: "Testdwre333",
                        sortOrder: "1",

                        items: [],
                        keys: {
                          uf: "ABC:CG:mvp:UF:test:v2",
                          sf: "ABC:CG:mvp:SF:test:v2",
                        },
                      },
                    ],
                    keys: {
                      uf: "ABC:CG:mvp:UF:test:v2",
                      sf: "ABC:CG:mvp:SF:test:v2",
                    },
                  },
                ],
              },
        
            ],
            keys: {},
          },
          {
            id: "29",
            title: "Bank",
            link: "/table",
            sortOrder: "1",
            type: "item",
            items: [],
            keys: {
              df: "ABC:CG:mvp:DF:bankinghub:v2",
              uf: "ABC:CG:mvp:UF:bank:v2",
              sf: "ABC:CG:mvp:SF:bank:v1",
            },
          },
        ],
        keys: {
          sf: "ABC:CG:mvp:SF:branch:v1",
          uf: "ABC:CG:mvp:UF:branch:v2",
          df: "ABC:CG:mvp:DF:bankinghub:v2",
        },
      },
    ],
  },
  {
    id: "2",
    title: "Home",
    sortOrder: "2",
    type: "group",
    items: [
      {
        id: "45",
        title: "Profile",
        sortOrder: "1",
        type: "group",
        items: [
          {
            id: "46",
            title: "Test",
            sortOrder: "1",
            type: "item",
            items: [],
            keys: {
              uf: "ABC:CG:mvp:UF:test:v2",
              sf: "ABC:CG:mvp:SF:test:v2",
            },
          },
        ],
        keys: {},
      },
    ],
  },
  {
    id: "3",
    title: "Test1",
    sortOrder: "3",
    type: "item",
    keys: {
      sf: "ABC:CG:mvp:SF:test:v3",
    },
  },
  {
    id: "4",
    title: "Profile",
    sortOrder: "4",
    type: "group",
    items: [
      {
        id: "56",
        title: "Contact",
        sortOrder: "1",
        type: "group",
        items: [
          {
            id: "57",
            title: "Address",
            sortOrder: "1",
            type: "item",
            items: [],
            keys: {
              sf: "ABC:CG:mvp:SF:test:v3",
            },
          },
        ],
        keys: {},
      },
    ],
  },
];

// const SubMenu = ({
//   pPositon,
//   items,
//   showSubMenu,
//   onMouseEnter,
//   onMouseLeave,
//   onItemClick,
// }) => {
//   const [position, setPosition] = useState({ top: 0, left: 0 });
//   const [showSubMenus, setShowSubMenus] = useState(
//     Array(menus.length).fill(false)
//   );
//   const handleMouseEnter = (id) => {
//     setShowSubMenus((prev) => {
//       const updatedSubMenu = [...prev];
//       updatedSubMenu[id] = true;
//       return updatedSubMenu;
//     });
//   };

//   const handleMouseLeave = (id) => {
//     setShowSubMenus((prev) => {
//       const updatedSubMenu = [...prev];
//       updatedSubMenu[id] = false;
//       return updatedSubMenu;
//     });
//   };
//   return (
//     <div
//       style={{ position: "absolute", top: pPositon?.top, left: pPositon?.left }}
//     >
//       {items &&
//         items.map((item, index) => (
//           <li
//             key={item.id}
//             onMouseOver={(e) => {
//               handleMouseEnter(item.id);
//               setPosition({
//                 top: `${e.clientY}`,
//                 left: `${e.clientX}`,
//               });
//             }}
//             onMouseLeave={() => handleMouseLeave(item.id)}
//             className="p-2"
//             style={{
//               display: showSubMenu || showSubMenus[item.id] ? "block" : "none",
//             }}
//           >
//             <div
//               style={{
//                 display:
//                   showSubMenu || showSubMenus[item.id] ? "block" : "none",
//               }}
//               className="  bg-[#FAF5FA] shadow-lg rounded-md p-2 cursor-pointer flex items-center"
//             >
//               <span className="text-yellow-400"> {item.title}</span>
//             </div>
//             {item.items && (
//               <div className=" mt-0 bg-[#FAF5FA] shadow-lg rounded-md p-2">
//                 <ul>
//                   {item.items.map((child, idx) => (
//                     <li
//                       key={child.id}
//                       className="p-2"
//                       onMouseOver={(e) => {
//                         handleMouseEnter(child.id);
//                       }}
//                       onMouseLeave={() => handleMouseLeave(child.id)}
//                     >
//                       <div
//                         className="  cursor-pointer flex items-center"
//                         style={{
//                           display: showSubMenus[item.id] ? "block" : "none",
//                         }}
//                       >
//                         <a href={item.link}>
//                           <span className="text-red-600"> {child.title}</span>
//                         </a>
//                       </div>

//                       {child.items && (
//                         <SubMenu
//                           pPositon={position}
//                           items={child.items}
//                           showSubMenu={showSubMenus[child.id]}
//                           onMouseEnter={onMouseEnter}
//                           onMouseLeave={onMouseLeave}
//                           // onItemClick={onItemClick}
//                         />
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </li>
//         ))}
//     </div>
//   );
// };

// const RenderDropdown = ({ menus }) => {
//   const [selectedIndex, setSelectedIndex] = useState(null);
//   const [showSubMenu, setShowSubMenu] = useState(
//     Array(menus.length).fill(false)
//   );
//   const handleMouseEnter = (id) => {
//     setShowSubMenu((prev) => {
//       const updatedSubMenu = [...prev];
//       updatedSubMenu[id] = true;
//       return updatedSubMenu;
//     });
//   };

//   const handleMouseLeave = (id) => {
//     setShowSubMenu((prev) => {
//       const updatedSubMenu = [...prev];
//       updatedSubMenu[id] = false;
//       return updatedSubMenu;
//     });
//     2;
//   };
//   return (
//     <div className="relative">
//       <ul className="flex gap-3">
//         {menus &&
//           menus.map((item, index) => (
//             <li
//               key={item.id}
//               onMouseEnter={() => handleMouseEnter(item.id)}
//               onMouseLeave={() => handleMouseLeave(item.id)}
//               className="p-2 relative"
//             >
//               <div className="cursor-pointer flex items-center">
//                 <span className="text-white"> {item.title}</span>
//               </div>

//               {item.items && (
//                 <div
//                   style={{ display: showSubMenu[item.id] ? "block" : "none" }}
//                   className="absolute top-full left-0   bg-white shadow-lg rounded-md p-2"
//                 >
//                   <ul>
//                     {item.items.map((child, idx) => (
//                       <li key={child.id} className="p-2">
//                         <div
//                           className="cursor-pointer flex items-center"
//                           onMouseEnter={() => handleMouseEnter(child.id)}
//                           onMouseLeave={() => handleMouseLeave(child.id)}
//                         >
//                           <span className="text-green-500"> {child.title}</span>
//                           {child.items.length > 0 && (
//                             <span className="ml-2">▶</span>
//                           )}
//                         </div>
//                         {child.items && (
//                           <SubMenu
//                             items={child.items}
//                             showSubMenu={showSubMenu[child.id]}
//                             onMouseEnter={() => handleMouseEnter(child.id)}
//                             onMouseLeave={() => handleMouseLeave(child.id)}
//                             // onItemClick={handleItemClick}
//                           />
//                         )}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </li>
//           ))}
//       </ul>
//     </div>
//   );
// };

const Dropdown = ({ subitems, dropdown, depthLevel }) => {
  const dropdownClass = depthLevel > 1 && subitems ? "dropdown-submenu" : "";

  return (
    <ul
      className={` ${dropdownClass} ${
        dropdown && subitems.length > 0 ? "block" : "hidden"
      } ${
        depthLevel > 1
          ? " absolute gap-10 top-0 left-[7rem] min-w-32 min-h-16 "
          : "left-0 min-w-32"
      } absolute right-0  shadow-lg border  p-2 text-sm bg-white rounded-lg z-50 `}
      aria-label="submenu"
    >
      {subitems.map((submenu, index) => (
        <MenuItems items={submenu} key={index} depthLevel={depthLevel} />
      ))}
    </ul>
  );
};

const MenuItems = ({ items, depthLevel }) => {
  const [dropdown, setDropdown] = useState(false);
  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    setDropdown(true);
  };

  const onMouseLeave = () => {
    setDropdown(false);
  };

  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  const closeDropdown = () => {
    dropdown && setDropdown(false);
  };

  return (
    <li
      className={`${
        depthLevel == 0 ? "text-white hover:text-gray-500" : "text-black w-full "
      } relative`}
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={closeDropdown}
    >
      {items.items ? (
        <div className="">
          <button
            type="button"
            onClick={() => toggleDropdown()}
            className={`${
              depthLevel > 0
                ? " hover:bg-gray-300 w-full px-2 py-2 rounded"
                : "  p-2 "
            }  focus:outline-none relative z-50`}
          >
            <span>
              <Link to={items.link}>
                <p className="flex items-center gap-2 ">
                  {items.title}{" "}
                  {items.items && items.items.length > 0 && depthLevel > 0 ? (
                    <span className="arrow">
                      <MdOutlineKeyboardDoubleArrowRight />
                    </span>
                  ) : (
                    ""
                  )}
                </p>
              </Link>
            </span>
          </button>
          <Dropdown
            depthLevel={depthLevel + 1}
            subitems={items.items}
            dropdown={dropdown}
          />
        </div>
      ) : (
        <a href={items.link}>
          <p  className="text-white cursor-grab">{items.title} </p>
        </a>
      )}
    </li>
  );
};

export default function TorusNavBar() {
  const depthLevel = 0;

  return (
    <div className="bg-[#070D1F] px-3 py-3 m-0 ">
      <nav className="flex flex-col  justify-between items-center lg:flex-row   w-full">
        <div className="flex space-x-4 items-center  ">
          <div className="">
            <TorusLogo />
          </div>

        </div>

        <div className="flex space-x-20 ">
          <ul className="flex lit-none gap-3 items-center w-full">
            {menus.map((menu, index) => {
              return (
                <MenuItems items={menu} key={index} depthLevel={depthLevel} />
              );
            })}
          </ul>
        </div>

        <div className="flex space-x-4 mt-4 lg:mt-0">
          <div>
            <TorusButton
              btncolor="secondary"
              buttonClassName=" w-[80px] h-[30px] border border-[#0736C4] text-xs  text-white rounded-md flex justify-center items-center"
              Children={"Save"}
             
            />
          </div>
          <div className="text-white">
            <TorusButton
              btncolor="#9259b8"
              buttonClassName=" bg-[#0736C4] w-[80px] h-[30px] text-xs text-white rounded-md flex justify-center items-center"
              Children={"Save as"}
            />
          </div>
        </div>
      </nav>
    </div>
  );
}
