
export const getVersion = async (
  tenant,
  appGroup,
  app,
  fabrics,
  artifact,
  version,
  componentName,
  controlName,
  ccwVersion
) => {
  const BASE_URL = `${process.env.REACT_APP_API_URL}events/version`;

  try {
    const response = await fetch(
      `${BASE_URL}?tenant=${tenant}&appGroup=${appGroup}&app=${app}&fabrics=${fabrics}&artifact=${artifact}&version=${version}&componentName=${componentName}&controlName=${controlName}&ccwVersion=${ccwVersion}`,

      {
        method: "GET",
      }
    );

    if (!response.ok) {
      //throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching version:", error);
  }
};

export const getEventsByVersion = async (
  tenant,
  appGroup,
  application,
  fabrics,
  mainArtifacts,
  mainVersion,
  componentName,
  controlName,
  ccwversion
) => {
  const BASE_URL = `${process.env.REACT_APP_API_URL}events/`;
  try {
    const response = await fetch(
      `${BASE_URL}?tenant=${tenant}&appGroup=${appGroup}&app=${application}&fabrics=${fabrics}&artifact=${mainArtifacts}&version=${mainVersion}&componentName=${componentName}&controlName=${controlName}&ccwVersion=${ccwversion}`,

      {
        method: "GET",
      }
    );

    if (!response.ok) {
      //throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};



export const handleEvents = async (
  tenant,

  appGroup,

  application,

  fabrics,
  mainArtifacts,

  mainVersion,

  componentName,

  controlName,

  ccwversion,

  data,

  type
) => {
  const BASE_URL = `${process.env.REACT_APP_API_URL}events`;

  try {
    let url;

    let body;

    url = `${BASE_URL}?tenant=${tenant}&appGroup=${appGroup}&app=${application}&fabrics=${fabrics}&artifact=${mainArtifacts}&version=${mainVersion}&componentName=${componentName}&controlName=${controlName}&ccwVersion=${ccwversion}`;

    body = {
      type: type,
      data: data,
    };

    const response = await fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(body),
    });

    if (!response.ok) {
      //throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Error handling events:", error);
  }
};
