import { Button, useDisclosure } from "@nextui-org/react";
import { DisplayAddFactsPopup } from "./AddFactsPopup";

export const FactButtonComponent = ({
  FactList,
  selectedFacts,
  setSelectedFacts,
  handleAddNode,
  handleRemoveNode,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleFacts = (item) => {
    switch (item) {
      case "AddFacts":
        onOpen();
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
  };

  return (
    <>
      <p>step2:Add/Remove facts</p>
      <div className="flex gap-2">
        {FactList.map((item) => (
          <Button
            size="sm"
            radius="sm"
            className={` rounded-md `}
            onClick={() => {
              setSelectedFacts(item);
              handleFacts(item);
            }}
            style={{
              border: "1px solid gray",
            }}
          >
            {item}
          </Button>
        ))}
      </div>

      <DisplayAddFactsPopup
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        handleAddNode={handleAddNode}
      />
    </>
  );
};
