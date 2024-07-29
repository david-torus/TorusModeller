import { Button } from "@nextui-org/react";

export const AddOutComeComponent = ({
  type,
  setType,
  addKeyValue,
  params,
  handleKeyChange,
  handleValueChange,
  handleOutcome
}) => {
  return (
    <div>
      <div className="w-full ">
        <div className="border   bg-slate-200  border-slate-950/50 rounded-md ">
          <div className="h-[350px] p-2">
            <div className="w-[100%] flex justify-end">
              <Button
                onClick={() => {
                  addKeyValue();
                }}
              >
                {" "}
                + Add Params
              </Button>
            </div>

            <div className="h-[70px]">
              <div className="ml-4">
                <label>Type</label>
              </div>
              <div className=" w-[50%] m-2  px-2 ">
                <input
                  type="text"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  style={{
                    width: "100%",
                    height: "30px",
                    outline: "none",
                    borderRadius: "5px",
                    backgroundColor: "transparent",
                    border: "1px solid #000000",
                    color: "black",
                  }}
                />
              </div>
            </div>

            <div className=" w-[100%] h-[160px] overflow-y-scroll scrollbar-hide p-2  flex flex-col">
              {params.map((param, index) => (
                <div key={index} className="  flex gap-10 m-1 px-2">
                  <div className="flex-grow-1 w-[45%]">
                    <label>Key</label>
                    <input
                      type="text"
                      value={param.key}
                      onChange={(e) => handleKeyChange(index, e.target.value)}
                      style={{
                        width: "100%",
                        height: "30px",
                        outline: "none",
                        borderRadius: "5px",
                        backgroundColor: "transparent",
                        border: "1px solid #000000",
                        color: "black",
                      }}
                    />
                  </div>

                  <div className="flex-grow-1 w-[45%] ml-2">
                    <label>Value</label>
                    <input
                      type="text"
                      value={param.value}
                      onChange={(e) => handleValueChange(index, e.target.value)}
                      style={{
                        width: "100%",
                        height: "30px",
                        outline: "none",
                        borderRadius: "5px",
                        backgroundColor: "transparent",
                        border: "1px solid #000000",
                        color: "black",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="m-3">
              <Button
                onClick={() => {
                  handleOutcome();
                }}
                className="bg-slate-400/25 rounded-md shadow-sm "
              >
                Add outcome
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
