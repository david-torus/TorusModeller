export const executeCode = async (key, nodeName, code) => {
  try {
    const URL = `${process.env.REACT_APP_API_URL}codeExecute`;
    return await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key: key, nodeName: nodeName, code: code }),
    }).then((res) => res.json());
  } catch (error) {
    console.error(error, "code execute error");
  }
};

export const codeObject = async (key, nodeName) => {
  try {
    const URL = `${process.env.REACT_APP_API_URL}vpt/customCodeObjects`;
    return await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key: key, nodeName: nodeName }),
    }).then((res) => res.json());
  } catch (error) {
    console.error(error, "custom code object error");
  }
};
