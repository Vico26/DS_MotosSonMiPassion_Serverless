const ParteService = require("../business/parteService");
const ParteRepository = require("../repositories/parteRepository");

const service = new ParteService(new ParteRepository());

module.exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const result = await service.crearParte(body);

    return {
      statusCode: 201,
      body: JSON.stringify(result)
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message })
    };
  }
};