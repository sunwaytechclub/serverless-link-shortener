const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
});

/**
 * Register shortern link
 * @param {string} link Original long link
 */
const register = async (link, preferName) => {
  const params = {
    TableName: "linkShorternerDB",
    Item: {
      shortname: preferName,
      url: link,
    },
  };

  const existingLink = await getLinkByName(preferName);
  if (existingLink["Count"] > 0) {
    console.log(existingLink);
    throw new Error(`Invalid name: ${preferName} was already registered`);
  }

  await dynamodb.put(params).promise();
};

/**
 * Get shortern link by name
 * @param {string} name
 */
const getLinkByName = async (name) => {
  const params = {
    TableName: "linkShorternerDB",
    KeyConditionExpression: "shortname = :shortname",
    ExpressionAttributeValues: {
      ":shortname": name,
    },
  };

  let link = await dynamodb.query(params).promise();

  return link;
};

module.exports = {
  register,
  getLinkByName,
};
