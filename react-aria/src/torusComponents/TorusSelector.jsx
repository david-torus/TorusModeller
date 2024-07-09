import {
  Button,
  Heading,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components";
import { FaAngleDown } from "react-icons/fa6";
import { IoIosCheckmark } from "react-icons/io";
export default function TorusSelector({
  label,
  items = [
    { key: "Item 1", label: "Item 1" },
    { key: "Item 2", label: "Item 2" },
    { key: "Item 3", label: "Item 3" },
  ],
}) {
  return (
    <div className="flex justify-start w-[100%] pt-2">
      <Select
        className={
          "w-[100%] flex flex-col gap-0.5 bg-white rounded-md px-2 py-3 "
        }
      >
        <Label className="text-xs text-[#000000]/50">{label}</Label>
        <Popover offset={15} placement="bottom" className="w-[20%]">
          <ListBox
            items={items}
            className="w-[100%] bg-slate-50 border-2 border-gray-100 transition-all p-1 rounded-md gap-1 flex flex-col items-center torus-focus:outli"
          >
            {(item) => (
              <ListBoxItem className="w-[100%] bg-slate-50 border-2 border-gray-100 transition-all p-1 rounded-md gap-1 flex flex-col items-center torus-hover:outline-none torus-hover:ring-0 torus-hover:border-transparent">
                {({ isSelected }) => (
                  <div className="w-full flex justify-between items-center torus-focus:outline-none ">
                    <Heading className="  3xl:text-xs xl:text-sm font-normal  tracking-tighter">
                      {item.label}
                    </Heading>

                    <div className="flex items-center justify-center  ">
                      <span
                        className={` transition-all duration-150  ${
                          isSelected ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <IoIosCheckmark size={20} color="#000" />
                      </span>
                    </div>
                  </div>
                )}
              </ListBoxItem>
            )}
          </ListBox>
          
        </Popover>
        <Button
          className={
            "flex justify-between items-center torus-pressed:border-transparent torus-focus:outline-none torus-pressed:ring-0  "
          }
          
        >
          <div className="w-[50%] flex justify-start">
            <SelectValue className="text-sm text-[#000000]" />
          </div>
          <div className="w-[50%] flex justify-end" aria-hidden="true">
            <FaAngleDown size={15} />
          </div>
        </Button>
      </Select>
    </div>
  );
}
