module.exports = async (e) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v1.0! Your function executed successfully!",
        input: e,
      },
      null,
      2
    ),
  };
};
