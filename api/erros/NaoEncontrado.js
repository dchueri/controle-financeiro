class NaoEncontrado extends Error {
  constructor() {
    super("Receita não encontrada!");
    this.name = "NaoEncontrado";
    this.idErro = 0;
  }
}

module.exports = NaoEncontrado;
