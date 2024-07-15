import { Dialog } from "primereact/dialog";
import React from "react";

const Deletepop = ({ deletepop, setDeletepop, id, node, deleteNode }) => {
  return (
    <div>
      <Dialog
        resizable={false}
        draggable={false}
        header={`${node && node?.data.label}`}
        headerStyle={{
          height: "40px",
          textAlign: "center",
          textTransform: "capitalize",
          backgroundColor: "#D3D3D3",
        }}
        visible={deletepop}
        onHide={() => setDeletepop(false)}
        width={50}
        closable={false}
        style={{ Radius: "10px", top: "0%" }}
      >
        <div className="mt-[20px]">
          <span className="text-[#36454F] mb-[40px]">
            Are you sure you want to delete this Node ? <br />
            This node may have Relationship
          </span>
          <div className="flex mt-[30px] ml-[145px]">
            <button
              className="mr-1 text-black bg-gray-300 border border-gray-400 hover:border-2 hover:border-gray-400 
              hover:scale-105   hover:bg-gray-300 transition-all 
              duration-200 k px-[15px] py-[7px]  rounded-md"
              onClick={() => setDeletepop(false)}
            >
              Discard
            </button>

            <button
              className="ml-2 text-black  bg-white border border-gray-400 hover:border-2 
              hover:border-gray-400 hover:scale-105  hover:bg-red-400
              transition-all duration-200  px-[15px] py-[7px]
              rounded-md hover:text-white"
              onClick={() => deleteNode(id, node)}
            >
              Delete
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Deletepop;
