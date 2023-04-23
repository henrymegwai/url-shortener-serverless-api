import type { AWS } from "@serverless/typescript";

const functions: AWS["functions"] = {
  //config object
  setUrl: {
    //lambda function
    handler: "src/functions/setUrl/index.handler",
    events: [
      {
        //Apigateway
        httpApi: {
          path: "/",
          method: "post",
        },
      },
    ],
  },
  getUrl:{
    handler: "src/functions/getUrl/index.handler",
    events: [
      {
        //Apigateway
        httpApi: {
          path: "/{code}",
          method: "get",
        },
      },
    ],
  }
};

export default functions;
