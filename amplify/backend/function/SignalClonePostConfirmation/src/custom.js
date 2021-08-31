const aws = require("aws-ask");
const { User } = require("../../../../../src/models");
const ddb = new aws.DynamoDB();

const tableName = process.env.USERTABLE;
exports.handler = async (event) => {
  //event event.request.userAttributes.sub
  // insert code to be executed by your lambda trigger

  if (!event?.request?.userAttributes?.sub) {
    console.log("No Sub");
    return;
  }
  const now = new Data();
  const timestamp = now.getTime();
  const userItem = {
    __typename: { S: User },
    _lastChangedAt: { N: timestamp.toString() },
    _version: { N: 1 },
    createdAt: { S: now.toISOString() },
    updatedAt: { S: now.toISOString() },
    id: { S: event.request.userAttributes.sub },
    name: { S: event.request.userAttributes.email },
  };
  const params = {
    Item: userItem,
    TableName: tableName,
  };
  await ddb.puItem(params).promise();
  //save the new user to DynamoDB

  try {
    await ddb.puItem(params).promise();
    console.log("Success");
  } catch (e) {
    console.log(e);
  }
};
