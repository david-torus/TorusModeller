import { toast } from "react-toastify";

export const getJson = async (
  application,
  version,
  artifact,
  tenant,
  appGroup,
  fabrics
) => {
  try {
    const BASE_URL = `${process.env.REACT_APP_API_URL}${fabrics === "PF" ? "pf-pfd" : fabrics === "DF" ? "df-erd" : fabrics === "UF" ? "uf-sld" : "sf"}`;
    const response = await fetch(
      `${BASE_URL}/?applicationName=${application}&version=${version}&artifact=${artifact}&tenant=${tenant}&appGroup=${appGroup}&fabrics=${fabrics}`,
      {
        method: "GET",
      }
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
  tenant,
  appGroup,
  fabrics
) => {
  try {
    const BASE_URL = `${process.env.REACT_APP_API_URL}${fabrics === "PF" ? "pf-pfd" : fabrics === "DF" ? "df-erd" : fabrics === "UF" ? "uf-sld" : "sf"}`;
    const URL =
      type === "create"
        ? `${BASE_URL}/?type=${type}&tenant=${tenant}&appGroup=${appGroup}&fabrics=${fabrics}`
        : `${BASE_URL}/?type=${type}&version=${version}&tenant=${tenant}&appGroup=${appGroup}&fabrics=${fabrics}`;
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

export const artifactList = async (tenant, appGroup, application, fabrics) => {
  try {
    console.log(application ,"app");
    const BASE_URL = `${process.env.REACT_APP_API_URL}${fabrics === "PF" ? "pf-pfd" : fabrics === "DF" ? "df-erd" : fabrics === "UF" ? "uf-sld" : "sf"}`;
    const response = await fetch(
      `${BASE_URL}/artifactList?applicationName=${application}&tenant=${tenant}&appGroup=${appGroup}&fabrics=${fabrics}`,
      {
        method: "GET",
      }
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

export const applicationLists = async (tenant, appGroup, fabrics) => {
  try {
    const BASE_URL = `${process.env.REACT_APP_API_URL}vpt`;
    const response = await fetch(
      `${BASE_URL}/applicationList/?tenant=${tenant}&appGroup=${appGroup}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();

    // toast.dismiss(loadingToastId);

    if (response.ok && data) {
      return data;
    } else {
      //throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    toast.error("Error getting application list", {
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
      }
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
  tenant,
  appGroup,
  application,
  artifact,
  fabrics
) => {
  try {
    const BASE_URL = `${process.env.REACT_APP_API_URL}${fabrics === "PF" ? "pf-pfd" : fabrics === "DF" ? "df-erd" : fabrics === "UF" ? "uf-sld" : "sf"}`;
    const response = await fetch(
      `${BASE_URL}/versionList?applicationName=${application}&artifact=${artifact}&tenant=${tenant}&appGroup=${appGroup}&fabrics=${fabrics}`,
      {
        method: "GET",
      }
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
  tenant,
  appGroup,
  application,
  fabrics,
  artifact
) => {
  try {
    const BASE_URL = `${process.env.REACT_APP_API_URL}vpt`;
    const response = await fetch(
      `${BASE_URL}/deleteFlowArtifact?tenant=${tenant}&appGroup=${appGroup}&applicationName=${application}&fabrics=${fabrics}&artifact=${artifact}`,
      {
        method: "DELETE",
      }
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
  tenant,
  appGroup,
  application,
  version,
  artifacts
) => {
  try {
    const BASE_URL = `${process.env.REACT_APP_API_URL}events`;
    const response = await fetch(
      `${BASE_URL}/?tenant=${tenant}&appGroup=${appGroup}&app=${application}&artifact=${artifacts}&version=${version}&events`,
      {
        method: "GET",
      }
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
  tenant,
  appGroup,
  application,
  version,
  artifacts
) => {
  try {
    const BASE_URL = `${process.env.REACT_APP_API_URL}events/wholeVersion`;
    const response = await fetch(
      `${BASE_URL}/?tenant=${tenant}&appGroup=${appGroup}&app=${application}&artifact=${artifacts}&version=${version}&events`,
      {
        method: "POST",
      }
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
  applicationName,
  version,
  artifact,
  tenant,
  appGroup,
  fabrics
) => {
  try {
    const BASE_URL = `${process.env.REACT_APP_API_URL}vpt`;
    const response = await fetch(
      `${BASE_URL}/getNodeList?applicationName=${applicationName}&version=${version}&artifact=${artifact}&tenant=${tenant}&appGroup=${appGroup}&fabrics=${fabrics}`,
      {
        method: "GET",
      }
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
