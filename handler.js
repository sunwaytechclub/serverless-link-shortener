"use strict";
const { shorternLink, getLink } = require("./functions/index");

module.exports.shorternLink = shorternLink;

module.exports.link = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v1.0! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };
};
