const db = require("./ModeloTabelaReceita");
class Services {
  constructor(nomeDoModelo) {
    this.nomeDoModelo = nomeDoModelo;
  }

  async validaExistencia(where = {}, checaSeExiste) {
    const resultado = await db.findOne({ where: { ...where }, raw: true });

    if (!resultado && checaSeExiste) {
      throw new Error("Não encontrado");
    }
    return resultado;
  }
}

module.exports = Services;
