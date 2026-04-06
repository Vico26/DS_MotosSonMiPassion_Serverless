const ParteService = require("../business/parteService");
const ParteRepository = require("../repositories/parteRepository");

const service = new ParteService(new ParteRepository());

module.exports.handler = async (event) => {
  try {
    const tipo = event.queryStringParameters.tipo;

    const result = await service.obtenerPorTipo(tipo);

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message })
    };
  }
};