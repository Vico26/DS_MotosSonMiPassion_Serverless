const Parte = require("../models/parteModel");
const { v4: uuidv4 } = require("uuid");

class ParteService {
  constructor(repository) {
    this.repository = repository;
  }

  async crearParte(data) {
    if (!data.nombre || !data.tipo || !data.precio) {
      throw new Error("Datos incompletos");
    }

    if (data.precio < 0) {
      throw new Error("Precio inválido");
    }

    const parte = new Parte(uuidv4(), data.nombre, data.tipo, data.precio);

    return await this.repository.save(parte);
  }

  async obtenerPorTipo(tipo) {
    return await this.repository.getByTipo(tipo);
  }
}

module.exports = ParteService;