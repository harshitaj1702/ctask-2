var axios = require("axios");

export const serverURL = "http://localhost:5000";

export const getData = async (url) => {
  try {
    const result = await axios.get(serverURL + "/" + url);
    return result.data;
  } catch (error) {
    return { status: false };
  }
};

