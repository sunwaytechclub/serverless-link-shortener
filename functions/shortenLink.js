const { links } = require("../models/index");

module.exports = async (e) => {
  if (e["headers"]["X-Token"] !== process.env.API_TOKEN) {
    return {
      statusCode: 401,
      body: `Unauthorized`,
    };
  }
  if (typeof e["body"] == "string") {
    e["body"] = JSON.parse(e["body"]);
  }
  let { url, name } = e["body"];
  try {
    await links.register(url, name);
    return {
      statusCode: 200,
      body: name,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: `Invalid name: ${name} was already registered`,
    };
  }
};
