import { formatJSONResponse } from "@libs/apiGateway";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { dynamo } from "@libs/dynamo";

//Lambda Handler
export const handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const { code } = event.pathParameters || {};
    if (!code) {
      return formatJSONResponse({
        statusCode: 400,
        data: { message: "missing code in path" },
      });
    }
    const tableName = process.env.urlTable;
    const record = await dynamo.get(code, tableName);
    console.log(`record: ${record}`);
    const originalUrl = record.originalUrl;
    return formatJSONResponse({
      data: { originalUrl },
    });
  } catch (error) {
    console.log("error", error);
    return formatJSONResponse({
      statusCode: 502,
      data: { message: error.message },
    });
  }
};
