const { links } = require("../models/index");

module.exports = async (e) => {
  let { pathParameters } = e;
  let { link } = pathParameters;

  let existingLink = await links.getLinkByName(link);
  if (!existingLink) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: `No link found with name ${link}`,
      }),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify(existingLink),
  };
};
