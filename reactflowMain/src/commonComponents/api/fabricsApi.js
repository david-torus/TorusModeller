import { toast } from "react-toastify";

export const getJson = async (
  project,
  version,
  artifact,
  tKey,
  client,
  fabrics,
  saveKey,
) => {
  try {
    const BASE_URL = `${process.env.REACT_APP_API_URL}${fabrics === "PF" ? "pf-pfd" : fabrics === "DF" ? "df-erd" : fabrics === "UF" ? "uf-sld" : "sf"}`;
    const response = await fetch(
      `${BASE_URL}/?project=${project}&version=${version}&artifact=${artifact}&tKey=${tKey}&client=${client}&fabrics=${fabrics}&saveKey=${saveKey}`,
      {
        method: "GET",
      },
    );

    const data = await response.json();

    // toast.dismiss(loadingToastId);

    if (response.ok && data) {
      return data;
    } else {
      //throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    toast.error("Error in Getting JSON", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    console.error(error);
  }
};

export const saveWorkFlow = async (
  resquestBody,
  type,
  version,
  tKey,
  client,
  fabrics,
  saveKey,
) => {
  try {
    console.log(resquestBody, "resquestBody");
    const BASE_URL = `${process.env.REACT_APP_API_URL}${fabrics === "PF" ? "pf-pfd" : fabrics === "DF" ? "df-erd" : fabrics === "UF" ? "uf-sld" : "sf"}`;
    const URL =
      type === "create"
        ? `${BASE_URL}/?type=${type}&tKey=${tKey}&client=${client}&fabrics=${fabrics}&saveKey=${saveKey}`
        : `${BASE_URL}/?type=${type}&version=${version}&tKey=${tKey}&client=${client}&fabrics=${fabrics}&saveKey=${saveKey}`;
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resquestBody),
    });

    const data = await response.json();

    // toast.dismiss(loadingToastId);

    if (response.ok && data) {
      return data;
    } else {
      //throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    toast.error("Error saved Work flow", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    console.error(error);
  }
};

export const artifactList = async (
  tKey,
  client,
  project,
  fabrics,
  saveKey,
  wantVersionList = false,
) => {
  try {
    console.log(project, "app");
    const BASE_URL = `${process.env.REACT_APP_API_URL}${fabrics === "PF" ? "pf-pfd" : fabrics === "DF" ? "df-erd" : fabrics === "UF" ? "uf-sld" : "sf"}`;
    const response = await fetch(
      `${BASE_URL}/${wantVersionList ? "artifactListWithVersion" : "artifactList"}?project=${project}&tKey=${tKey}&client=${client}&fabrics=${fabrics}&saveKey=${saveKey}`,
      {
        method: "GET",
      },
    );
    const data = await response.json();
    // toast.dismiss(loadingToastId);
    if (response.ok && data) {
      return data;
    } else {
      //throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};

export const getprojectLists = async (tKey, client, saveKey) => {
  try {
    const BASE_URL = `${process.env.REACT_APP_API_URL}vpt`;
    const response = await fetch(
      `${BASE_URL}/catelogue/?tKey=${tKey}&client=${client}&saveKey=${saveKey}`,
      {
        method: "GET",
      },
    );
    const data = await response.json();
    if (response.ok && data) {
      console.log(data, "catelogue");
      return data;
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    toast.error("Error getting project list", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
};

export const getArtifactsGroups = async (tKey, client, saveKey) => {
  try {
    console.log(saveKey, "<<>>catelogue<<>>");

    const BASE_URL = `${process.env.REACT_APP_API_URL}vpt`;
    const response = await fetch(
      `${BASE_URL}/artifactsGroup/?tKey=${tKey}&client=${client}&saveKey=${saveKey}`,
      {
        method: "GET",
      },
    );
    const data = await response.json();
    console.log(data, "artifactsGroup");
    if (data) {
      return data;
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    toast.error("Error getting project list", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
    });
  }
};

export const applicationLists = async (tKey, client, fabrics, saveKey) => {
  try {
    const BASE_URL = `${process.env.REACT_APP_API_URL}vpt`;
    const response = await fetch(
      `${BASE_URL}/applicationList/?tKey=${tKey}&client=${client}&saveKey=${saveKey}`,
      {
        method: "GET",
      },
    );

    const data = await response.json();

    // toast.dismiss(loadingToastId);

    if (response.ok && data) {
      return data;
    } else {
      //throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    toast.error("Error getting project list", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    console.error(error);
  }
};

export const getLatestVersion = async (source, domain, fabrics, artifact) => {
  try {
    const BASE_URL = `${process.env.REACT_APP_API_URL}vpt`;
    const response = await fetch(
      `${BASE_URL}/defaultVersion?source=${source}&domain=${domain}&fabrics=${fabrics}&artifact=${artifact}`,
      {
        method: "GET",
      },
    );

    const data = await response.json();
    // toast.dismiss(loadingToastId);

    if (response.ok && data) {
      return data;
    } else {
      //throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    // Display error toast
    toast.error("Error in Getting Latest Versions", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
};

export const versionList = async (
  tKey,
  client,
  project,
  artifact,
  fabrics,
  saveKey,
) => {
  try {
    const BASE_URL = `${process.env.REACT_APP_API_URL}${fabrics === "PF" ? "pf-pfd" : fabrics === "DF" ? "df-erd" : fabrics === "UF" ? "uf-sld" : "sf"}`;
    const response = await fetch(
      `${BASE_URL}/versionList?project=${project}&artifact=${artifact}&tKey=${tKey}&client=${client}&fabrics=${fabrics}&saveKey=${saveKey}`,
      {
        method: "GET",
      },
    );

    const data = await response.json();
    // toast.dismiss(loadingToastId);

    if (response.ok && data) {
      return data;
    } else {
      //throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    // Display error toast
    toast.error("Error in Getting Version List", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    console.error(error);
  }
};

export const deleteArtifact = async (
  tKey,
  client,
  project,
  fabrics,
  artifact,
  saveKey,
) => {
  try {
    const BASE_URL = `${process.env.REACT_APP_API_URL}vpt`;
    const response = await fetch(
      `${BASE_URL}/deleteFlowArtifact?tKey=${tKey}&client=${client}&project=${project}&fabrics=${fabrics}&artifact=${artifact}&saveKey=${saveKey}`,
      {
        method: "DELETE",
      },
    );

    const data = await response.json();
    // toast.dismiss(loadingToastId);

    if (response.ok && data) {
      return data;
    } else {
      //throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    // Display error toast
    toast.error("Error in Deleting Artifact", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    console.error(error);
  }
};

export const getWholeVersion = async (
  tKey,
  client,
  project,
  version,
  artifacts,
) => {
  try {
    const BASE_URL = `${process.env.REACT_APP_API_URL}events`;
    const response = await fetch(
      `${BASE_URL}/?tKey=${tKey}&client=${client}&app=${project}&artifact=${artifacts}&version=${version}&events`,
      {
        method: "GET",
      },
    );

    const data = await response.json();
    // toast.dismiss(loadingToastId);

    if (response.ok && data) {
      return data;
    } else {
      //throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    //Display error toast
    toast.error("Error in Getting Whole Version", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    console.error(error);
  }
};

export const saveWholeVersion = async (
  tKey,
  client,
  project,
  version,
  artifacts,
) => {
  try {
    const BASE_URL = `${process.env.REACT_APP_API_URL}events/wholeVersion`;
    const response = await fetch(
      `${BASE_URL}/?tKey=${tKey}&client=${client}&app=${project}&artifact=${artifacts}&version=${version}&events`,
      {
        method: "POST",
      },
    );

    const data = await response.json();
    // toast.dismiss(loadingToastId);

    if (response.ok && data) {
      return data;
    } else {
      //throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    //Display error toast
    toast.error("Error in Saving Whole Version", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    console.error(error);
  }
};

export const getNodeList = async (
  project,
  version,
  artifact,
  tKey,
  client,
  fabrics,
  saveKey,
) => {
  try {
    const BASE_URL = `${process.env.REACT_APP_API_URL}vpt`;
    const response = await fetch(
      `${BASE_URL}/getNodeList?project=${project}&version=${version}&artifact=${artifact}&tKey=${tKey}&client=${client}&fabrics=${fabrics}&saveKey=${saveKey}`,
      {
        method: "GET",
      },
    );
    const data = await response.json();
    // toast.dismiss(loadingToastId);

    if (response.ok && data) {
      return data;
    } else {
      //throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};

export const renameArtifact = async (oldKey, newKey) => {
  try {
    const BASE_URL = `${process.env.REACT_APP_API_URL}vpt`;
    const response = await fetch(
      `${BASE_URL}/renameArtifacts?oldKey=${oldKey}&newKey=${newKey}`,
      {
        method: "GET",
      },
    );
    const data = await response.json();
    if (response.ok && data) {
      return data;
    } else {
      //throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};

export const changeArtifactLock = async (saveKey, data) => {
  try {
    const BASE_URL = `${process.env.REACT_APP_API_URL}vpt/changeArtifactLock`;
    let res = await fetch(`${BASE_URL}/?saveKey=${saveKey}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};

export const getCatelogueList = async (data) => {
  try {
    const BASE_URL = `${process.env.REACT_APP_API_URL}vpt/getAllArtifacts`;
    let res = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};

export const getAllCatalogWithArtifactGroup = async (fabric) => {
  try {
    const BASE_URL = `${process.env.REACT_APP_API_URL}vpt/getAllCatalogWithArtifactGroup`;
    let res = await fetch(`${BASE_URL}/?fabric=${fabric}`, {
      method: "GET",
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};
