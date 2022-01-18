class NaoEncontrado extends Error {
  constructor() {
    super("Não encontrada!");
    this.name = "NaoEncontrado";
    this.idErro = 0;
  }
}

module.exports = NaoEncontrado;
