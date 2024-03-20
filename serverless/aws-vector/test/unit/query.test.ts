import { MockProxy, mock } from "jest-mock-extended";
import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";

import { handler } from "../../src/query";

describe("Basic test for query handler", () => {
  let context: MockProxy<Context>;

  beforeEach(() => {
    context = mock<Context>();
  });

  test("should get REST response object", async () => {
    const event = {} as APIGatewayEvent;
    const context = {} as Context;

    const res = await handler(event, context);

    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body)).toEqual({
      message: "ok",
    });
  });
});
