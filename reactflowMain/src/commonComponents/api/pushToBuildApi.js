export const getDataPushToBuild = async (tok) => {
  console.log(tok, "token");
  try {
    const URL = "http://192.168.2.110:3002/tp/AuthorizedTenantDetails";

    const res = await fetch(`${URL}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tok}`,
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    return "error";
  }
};
