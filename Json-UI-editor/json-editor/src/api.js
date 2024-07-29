export const fetchRule = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data, "rxx")
    return data;
  } catch (error) {
    console.error("Error fetching the rule:", error);
  }
};

export const saveRule = async (id, ruleData) => {
    console.log(ruleData, "rss")
  try {
    const response = await fetch(`http://localhost:3000/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ruleData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Rule saved successfully:", data);
    return data;
  } catch (error) {
    console.error("Error saving the rule:", error);
  }
};
