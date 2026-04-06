const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient({
  region: "localhost",
  endpoint: "http://localhost:8000"
});

const TABLE = "Partes";

class ParteRepository {
  async save(parte) {
    await dynamo
      .put({
        TableName: TABLE,
        Item: parte
      })
      .promise();

    return parte;
  }

  async getByTipo(tipo) {
    const result = await dynamo
      .scan({
        TableName: TABLE,
        FilterExpression: "#tipo = :tipo",
        ExpressionAttributeNames: {
          "#tipo": "tipo"
        },
        ExpressionAttributeValues: {
          ":tipo": tipo
        }
      })
      .promise();

    return result.Items;
  }
}

module.exports = ParteRepository;