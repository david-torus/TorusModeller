// export const getVersion = async (
//   tenant,
//   appGroup,
//   app,
//   fabrics,
//   artifact,
//   version,
//   componentName,
//   controlName,
//   ccwVersion,
// ) => {
//   const BASE_URL = `${process.env.REACT_APP_API_URL}events/version`;

//   try {
//     const response = await fetch(
//       `${BASE_URL}?tenant=${tenant}&appGroup=${appGroup}&app=${app}&fabrics=${fabrics}&artifact=${artifact}&version=${version}&componentName=${componentName}&controlName=${controlName}&ccwVersion=${ccwVersion}`,

//       {
//         method: "GET",
//       },
//     );

//     if (!response.ok) {
//       //throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching version:", error);
//   }
// };

export const getEventsByVersion = async (
  tenant,
  appGroup,
  application,
  fabrics,
  mainArtifacts,
  mainVersion,
  componentName,
  controlName,
  saveKey,
) => {
  const BASE_URL = `${process.env.REACT_APP_API_URL}events/`;
  try {
    const response = await fetch(
      `${BASE_URL}?tenant=${tenant}&appGroup=${appGroup}&app=${application}&fabrics=${fabrics}&artifact=${mainArtifacts}&version=${mainVersion}&componentName=${componentName}&controlName=${controlName}&saveKey=${saveKey}`,

      {
        method: "GET",
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

export const getInitialEvents = async (
  tKey,
  client,
  project,
  fabrics,
  mainArtifacts,
  mainVersion,
  saveKey,
) => {
  const BASE_URL = `${process.env.REACT_APP_API_URL}events/initiate/`;
  try {
    const response = await fetch(
      `${BASE_URL}?tKey=${tKey}&client=${client}&project=${project}&fabrics=${fabrics}&artifact=${mainArtifacts}&version=${mainVersion}&saveKey=${saveKey}`,
    ).then((res) => res.json());
    console.log(response, "response from intiate events");
    return response;
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
  data,
  saveKey,
) => {
  console.log(data, "bodyyy-->");

  const BASE_URL = `${process.env.REACT_APP_API_URL}events`;

  try {
    let url;

    let body;

    url = `${BASE_URL}?tenant=${tenant}&appGroup=${appGroup}&app=${application}&fabrics=${fabrics}&artifact=${mainArtifacts}&version=${mainVersion}&componentName=${componentName}&controlName=${controlName}&saveKey=${saveKey}`;

    body = {
      data: data,
    };

    console.log(url, body, "bodyy-->");

    const response = await fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Error handling events:", error);
  }
};
