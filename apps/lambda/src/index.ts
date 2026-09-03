import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  UpdateCommand,
  type GetCommandInput,
  type UpdateCommandInput,
} from "@aws-sdk/lib-dynamodb";
import type { APIGatewayProxyEventV2 } from "aws-lambda";

const client = new DynamoDBClient({});
const ddb = DynamoDBDocumentClient.from(client);
const validDays: string[] = ["monday", "tuesday", "thursday", "friday"];

interface Player {
  id: string;
  name: string;
  rank: number;
  attending: boolean;
}

interface Roster {
  players: Player[];
}

export const handler = async (event: APIGatewayProxyEventV2) => {
  console.log(JSON.stringify(event));
  const httpVerb = event.requestContext.http.method.toLowerCase();
  const day = (
    event.requestContext?.http.path.split("/")[2] ?? ""
  ).toLowerCase();
  const dayCleaned = validDays.includes(day) ? day : undefined;
  if (!dayCleaned) throw new Error("Error: invalid request");

  if (httpVerb === "get") {
    const query: GetCommandInput = {
      TableName: "rosters",
      Key: {
        day: dayCleaned,
      },
    };

    const resp = await ddb.send(new GetCommand(query));

    const responseHeaders = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    return {
      statusCode: 200,
      headers: responseHeaders,
      body: JSON.stringify(resp.Item),
    };
  } else if (httpVerb === "post") {
    if (!event.body) throw new Error("Error: invalid request");
    const body = JSON.parse(event.body) as Roster;
    if (!body.players) throw new Error("Error: no roster to update to");

    const update: UpdateCommandInput = {
      TableName: "rosters",
      Key: {
        day: dayCleaned,
      },
      ExpressionAttributeNames: {
        "#p": "players",
      },
      ExpressionAttributeValues: {
        ":p": body.players,
      },
      UpdateExpression: "SET #p = :p",
    };

    await ddb.send(new UpdateCommand(update));

    const responseHeaders = {
      "Access-Control-Allow-Origin": "*",
    };
    return {
      statusCode: 200,
      headers: responseHeaders,
    };
  } else if (httpVerb === 'options') {
    const responseHeaders = {
      "Access-Control-Allow-Origin": "*",
    };
    return {
      statusCode: 200,
      headers: responseHeaders,
    };

  }
};
