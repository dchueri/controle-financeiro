class NaoEncontrado extends Error {
  constructor(dado) {
    super(`${dado} não encontrada!`);
    this.name = "NaoEncontrado";
    this.idErro = 0;
  }
}

module.exports = NaoEncontrado;
