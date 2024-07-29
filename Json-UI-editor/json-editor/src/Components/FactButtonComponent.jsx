import { Button } from "@nextui-org/react";

export const FactButtonComponent = ({
  FactList,
  selectedFacts,
  setSelectedFacts,
  handleAddNode,
  handleRemoveNode,
}) => {
    const handleFacts = (item) => {
        switch(item) {
            case "AddFacts":
                handleAddNode("factname", { lessThan: 10 });
                break;
            case "AddAll":
                handleAddNode("all");
                break;
            case "AddAny":
                handleAddNode("any");
                break;
            case "Remove":
                handleRemoveNode();
                break;
            default:
                break;
        }
    }

  return (
    <>
      <p >step2:Add/Remove facts</p>
      <div className="flex gap-2">
        {FactList.map((item) => (
          <Button
            size="sm"
            radius="sm"
            className={` rounded-md `}
            onClick={() => {
              setSelectedFacts(item);
              handleFacts(item)
            }}
            style={{
                border:"1px solid gray",
            }}
          >
            {item}
          </Button>
        ))}
      </div>
    </>
  );
};
