import { formatJSONResponse } from "@libs/apiGateway";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { v4 as uuid } from "uuid";
import { dynamo } from "@libs/dynamo";

//Lambda Handler
export const handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const tableName = process.env.
    ;
    const baseUrl = process.env.baseUrl;
    console.log({
      tableName,
      environmentVars: process.env
    })
    const body = JSON.parse(event.body);
    const originalUrl = body.url;
    const code = uuid().slice(0, 8);
    const shortUrl = `${baseUrl}/${code}`;
    const data = {
      id: code,
      shortUrl,
      originalUrl,
    };

    await dynamo.write(data, tableName);
    return formatJSONResponse({
      data: { shortUrl, originalUrl },
    });
  } catch (error) {
    console.log("error", error);
    return formatJSONResponse({
      statusCode: 502,
      data: { message: error.message },
    });
  }
};
