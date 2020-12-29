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
    TableName: "linkShorterner",
    Item: {
      shortname: preferName,
      url: link,
    },
  };

  const existingLink = await getLinkByName(preferName);
  if (existingLink) {
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
    TableName: "linkShorterner",
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
