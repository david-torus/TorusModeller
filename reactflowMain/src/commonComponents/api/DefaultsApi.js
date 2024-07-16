import { toast } from "react-toastify";

export const getDefaultJson = async (
  version,
  artifact,
  source,
  domain,
  fabrics
) => {
  try {
    const BASE_URL = `${process.env.REACT_APP_API_URL}${fabrics === "PF" ? "pfd" : fabrics === "DF" ? "dfd" : "ufd"}`;
    const response = await fetch(
      `${BASE_URL}/?&version=${version}&artifact=${artifact}&source=${source}&domain=${domain}&fabrics=${fabrics}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();

    // Return the fetched data
    return data || {};
  } catch (error) {
    // Display error toast
    toast.error("Error in getting default JSON", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    // Throw the error so it can be caught by the caller
    console.error(error);
  }
};

export const saveWorkFlow = async (
  requestBody,
  type,
  version,
  source,
  domain,
  fabrics
) => {
  try {
    const BASE_URL = `${process.env.REACT_APP_API_URL}${fabrics === "PF" ? "pfd" : fabrics === "DF" ? "dfd" : "ufd"}`;
    const URL =
      type === "create"
        ? `${BASE_URL}/?type=${type}&source=${source}&domain=${domain}&fabrics=${fabrics}`
        : `${BASE_URL}/?type=${type}&version=${version}&source=${source}&domain=${domain}&fabrics=${fabrics}`;

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    // Dismiss Loading Toast
    // toast.dismiss(loadingToastId);

    if (response.ok && data) {
      // Return the response body
      return data;
    } else {
      throw new Error("Failed to save workflow");
    }
  } catch (error) {
    // Display error toast
    toast.error("Error in saving workflow", {
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

export const getartifactList = async (source, domain, fabrics) => {
  try {
    const BASE_URL = `${process.env.REACT_APP_API_URL}${fabrics === "PF" ? "pfd" : fabrics === "DF" ? "dfd" : "ufd"}`;
    const response = await fetch(
      `${BASE_URL}/artifactList?source=${source}&domain=${domain}&fabrics=${fabrics}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();

    if (response.ok && data) {
      return data;
    } else {
      throw new Error("Failed to fetch artifact list");
    }
  } catch (error) {
    // Display error toast
    toast.error("Error in Getting Artifacts", {
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

export const getFabricList = async (source, domain, fabrics = "PF") => {
  try {
    const BASE_URL = `${process.env.REACT_APP_API_URL}${fabrics === "PF" ? "pfd" : fabrics === "DF" ? "dfd" : "ufd"}`;
    const response = await fetch(
      `${BASE_URL}/fabricsList?source=${source}&domain=${domain}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();

    // toast.dismiss(loadingToastId);

    if (response.ok && data) {
      return data;
    } else {
      throw new Error("Failed to fetch fabric list");
    }
  } catch (error) {
    // Display error toast
    toast.error("Error in Getting Fabrics", {
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

export const getDomainList = async (source) => {
  try {
    const BASE_URL = `${process.env.REACT_APP_API_URL}vpt`;
    const response = await fetch(`${BASE_URL}/domainList?source=${source}`, {
      method: "GET",
    });

    const data = await response.json();

    if (response.ok && data) {
      return data;
    } else {
      throw new Error("Failed to fetch domain list");
    }
  } catch (error) {
    toast.error("Error in Getting Domains", {
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

export const getVersionList = async (source, domain, fabrics, artifact) => {
  try {
    const BASE_URL = `${process.env.REACT_APP_API_URL}${fabrics === "PF" ? "pfd" : fabrics === "DF" ? "dfd" : "ufd"}`;
    const response = await fetch(
      `${BASE_URL}/versionList?source=${source}&domain=${domain}&fabrics=${fabrics}&artifact=${artifact}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();

    if (response.ok && data) {
      // Return the response body
      return data;
    } else {
      throw new Error("Failed to fetch version list");
    }
  } catch (error) {
    // Display error toast
    toast.error("Error in Getting Versions", {
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
