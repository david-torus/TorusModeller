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

export const postDataPushToBuild = async (data) => {
  try {
    const URl = "http://192.168.2.110:3002/tp/pushArtifact";

    const res = await fetch(`${URl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        artifactKeyPrefix: data.artifactKeyPrefix,
        loginId: data.loginId,
        tenant: data.tenant,
        app: data.app,
      }),
    });
    if (res) {
      if (res.ok) {
        const data = await res.json();
        console.log(data, "ResponseonPUSHBUILD");
        return data;
      } else {
        return "error";
      }
    } else {
      return "error";
    }
  } catch (error) {
    console.log(error);
  }
};
