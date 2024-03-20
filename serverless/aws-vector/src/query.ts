import { APIGatewayEvent, Context } from "aws-lambda";

export async function handler(event: APIGatewayEvent, context: Context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "ok" }),
    input: event,
  };
}



// process pdf 


// process text files


// process images