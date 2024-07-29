import { Button } from "@nextui-org/react";

export const AllAnyButtonComponent = ({ 
    TopLevel,
    selectedTopLevel,
    setSelectedTopLevel,
    handleRoot

}) => {


  const handleTopLevel = (item) => {
    switch (item) {
      case "All":
        handleRoot("all")
        break;
      case "Any":
        handleRoot("any")
        break;
      default:
        break;
    }
}

  return (
    <div>
      <p>step1:Add TopLevel</p>
      <div>
        {TopLevel.map((item) => (
          <Button
            size="sm"
            radius="sm"
            className={` rounded-sm shadow-sm  ${
              item === selectedTopLevel ? "bg-red-400" : "bg-slate-400/25"
            } `}
            onClick={() => {setSelectedTopLevel(item);
                handleTopLevel(item);
            }}
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
};
