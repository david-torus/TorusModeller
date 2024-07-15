import { useState } from "react";
import { executeCode } from "../utils/api";
import { ProgressSpinner } from "primereact/progressspinner";

const Output = ({ fabricsKey, nodeName, editorRef }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef;
    if (!sourceCode) {
      setOutput(null);
      return;
    }
    try {
      setIsLoading(true);
      const data = await executeCode(fabricsKey, nodeName, sourceCode);
   
      setOutput(data.data.run.output.split("\n"));
      data.data.run.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full ">
      <p className="mb-2 font-bold">Output</p>
      <button
        className="mb-4 border-2 py-[3px] px-4 rounded-md border-green-300"
        isLoading={isLoading}
        onClick={async () => await runCode()}
      >
        Run Code
      </button>
      <div
        style={{ minHeight: "76vh", overflowY: "scroll" }}
        className={`p-2 w-full border-1 max-h-[73.5vh] border-gray-300/40 rounded-md scrollbar-default 
        ${isError && "border-1 border-solid border-red-500 text-red-400 rounded-sm"}`}
      >
        {isLoading ? (
          <ProgressSpinner style={{ width: "40px", height: "15px" }} />
        ) : output ? (
          output.map((line, i) => <p key={i}>{line}</p>)
        ) : (
          'Click "Run Code" to see the output here'
        )}
      </div>
    </div>
  );
};
export default Output;
