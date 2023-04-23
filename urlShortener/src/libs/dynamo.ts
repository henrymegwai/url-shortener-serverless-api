
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, GetCommandInput } from "@aws-sdk/lib-dynamodb";

// const dynamoDbClient = new DynamoDBClient({});

// export const dynamo = {
//   write: async (data: Record<string, any>, tableName: string) => {
//     const params: PutCommandInput = {
//       TableName: tableName,
//       Item: data,
//     };
//     const command = new PutCommand(params);
//     await dynamoDbClient.send(command);
//     return data;
//   },
//   get: async (id: string, tableName: string) => {
//     const params: GetCommandInput = {
//       TableName: tableName,
//       Key: { id },
//     };
//     const command = new GetCommand(params);
//     const record = await dynamoDbClient.send(command);
//     return record.Item;
//   },
// };
var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

export const dynamo = {
  write: async (data: any, tableName: string) => {
    var params = {
      TableName: tableName,
      Item: {
        id: data.id,
        shortUrl: data.shortUrl,
        originalUrl: data.originalUrl,
      },
    };

    docClient.put(params, function (err, data) {
      if (err) {
        throw err;
      } else {
        console.log({ "data saved": data });
        return data;
      }
    });
  },

  get: async (id: string, tableName: string) => {
    const dynamoDbClient = new DynamoDBClient({});
    const params: GetCommandInput = {
      TableName: tableName,
      Key: { id },
    };
    const command = new GetCommand(params);
    const record = await dynamoDbClient.send(command);
    return record.Item;
  },
};
