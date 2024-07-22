import React, { useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { Breadcrumb, Breadcrumbs, Link } from "react-aria-components";
import TorusButton from "./TorusButton";
import TorusAvatar from "./TorusAvatar";
import { MdDataArray } from "react-icons/md";
import { TorusLogo } from "../SVG_Application";

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
                    items: [],
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

const SubMenu = ({
  pPositon,
  items,
  showSubMenu,
  onMouseEnter,
  onMouseLeave,
  onItemClick,
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [showSubMenus, setShowSubMenus] = useState(
    Array(menus.length).fill(false)
  );
  const handleMouseEnter = (id) => {
    setShowSubMenus((prev) => {
      const updatedSubMenu = [...prev];
      updatedSubMenu[id] = true;
      return updatedSubMenu;
    });
  };

  const handleMouseLeave = (id) => {
    setShowSubMenus((prev) => {
      const updatedSubMenu = [...prev];
      updatedSubMenu[id] = false;
      return updatedSubMenu;
    });
  };
  return (
    <div
      style={{ position: "absolute", top: pPositon?.top, left: pPositon?.left }}
    >
      {items &&
        items.map((item, index) => (
          <li
            key={item.id}
            onMouseOver={(e) => {
              handleMouseEnter(item.id);
              setPosition({
                top: `${e.clientY}`,
                left: `${e.clientX}`,
              });
            }}
            onMouseLeave={() => handleMouseLeave(item.id)}
            className="p-2"
            style={{
              display: showSubMenu || showSubMenus[item.id] ? "block" : "none",
            }}
          >
            <div
              style={{
                display:
                  showSubMenu || showSubMenus[item.id] ? "block" : "none",
              }}
              className="  bg-[#FAF5FA] shadow-lg rounded-md p-2 cursor-pointer flex items-center"
            >
              <span className="text-yellow-400"> {item.title}</span>
            </div>
            {item.items && (
              <div className=" mt-0 bg-[#FAF5FA] shadow-lg rounded-md p-2">
                <ul>
                  {item.items.map((child, idx) => (
                    <li
                      key={child.id}
                      className="p-2"
                      onMouseOver={(e) => {
                        handleMouseEnter(child.id);
                       
                      }}
                      onMouseLeave={() => handleMouseLeave(child.id)}
                    >
                      <div
                        className="  cursor-pointer flex items-center"
                        style={{
                          display: showSubMenus[item.id] ? "block" : "none",
                        }}
                        
                      >
                        <a href={item.link}>
                        <span className="text-red-600"> {child.title}</span>
                        </a>
                      </div>

                      {child.items && (
                        <SubMenu
                          pPositon={position}
                          items={child.items}
                          showSubMenu={showSubMenus[child.id]}
                          onMouseEnter={onMouseEnter}
                          onMouseLeave={onMouseLeave}
                          // onItemClick={onItemClick}
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
    </div>
  );
};

const RenderDropdown = ({ menus }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showSubMenu, setShowSubMenu] = useState(
    Array(menus.length).fill(false)
  );
  const handleMouseEnter = (id) => {
    setShowSubMenu((prev) => {
      const updatedSubMenu = [...prev];
      updatedSubMenu[id] = true;
      return updatedSubMenu;
    });
  };

  const handleMouseLeave = (id) => {
    setShowSubMenu((prev) => {
      const updatedSubMenu = [...prev];
      updatedSubMenu[id] = false;
      return updatedSubMenu;
    });
  };
  return (
    <div className="relative">
      <ul className="flex gap-3">
        {menus &&
          menus.map((item, index) => (
            <li
              key={item.id}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={() => handleMouseLeave(item.id)}
              className="p-2 relative"
            >
              <div className="cursor-pointer flex items-center">
                <span className="text-white"> {item.title}</span>
              </div>

              {item.items && (
                <div
                  style={{ display: showSubMenu[item.id] ? "block" : "none" }}
                  className="absolute top-full left-0   bg-white shadow-lg rounded-md p-2"
                >
                  <ul>
                    {item.items.map((child, idx) => (
                      <li key={child.id} className="p-2">
                        <div
                          className="cursor-pointer flex items-center"
                          onMouseEnter={() => handleMouseEnter(child.id)}
                          onMouseLeave={() => handleMouseLeave(child.id)}
                        >
                          <span className="text-green-500"> {child.title}</span>
                          {child.items.length > 0 && (
                            <span className="ml-2">▶</span>
                          )}
                        </div>
                        {child.items && (
                          <SubMenu
                            items={child.items}
                            showSubMenu={showSubMenu[child.id]}
                            onMouseEnter={() => handleMouseEnter(child.id)}
                            onMouseLeave={() => handleMouseLeave(child.id)}
                            // onItemClick={handleItemClick}
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default function TorusNavBar() {
  return (
    <div className="bg-[#0736C4] p-4">
      <nav className="flex flex-col  justify-between items-center lg:flex-row   w-full">
        <div className="flex space-x-4 items-center  ">
          <div className="">
            <TorusLogo />
          </div>
          <div className=""></div>
        </div>

        <div className="flex space-x-20 ">
          <RenderDropdown menus={menus} />
        </div>

        <div className="flex space-x-4 mt-4 lg:mt-0">
          <div>
            <TorusButton
              btncolor=""
              buttonClassName=" w-[80px] h-[30px] border border-[#0736C4] text-xs  rounded-md flex justify-center items-center"
              Children={"Save"}
              fontStyle={"dark:text-white"}
            />
          </div>
          <div className="text-white">
            <TorusButton
              btncolor="secondary"
              buttonClassName=" bg-[#0736C4] w-[80px] h-[30px] text-xs text-white rounded-md flex justify-center items-center"
              Children={"Save as"}
            />
          </div>
        </div>
      </nav>
      {/* 
      <div className="absolute top-12 bg-[#F4F5FA] border rounded p-2">
        {open &&
          selectedItem &&
          Object.keys(selectedItem).map((ele, key) => {
            if (Array.isArray(selectedItem[ele])) {
              return (
                <span
                  key={key}
                  // style={{ display: key === selectedIndex ? "block" : "none" }}
                >
                  {selectedItem[ele].map((eles, keys) => {
                    console.log(eles, selectedItem[ele], "fhf");
                    return (
                      <p key={keys} className="text-black flex mb-2">
                        {eles.split('-')[0]}
                      </p>
                    );
                  })}
                </span>
              );
            }
          })
          
          
          }
      </div> */}
    </div>
  );
}
