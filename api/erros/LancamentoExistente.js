class LancamentoExistente extends Error {
    constructor(dado) {
      super(`Já existe o lançamento dessa ${dado} com essa descrição no mês selecionado!`);
      this.name = "LancamentoExistente";
      this.idErro = 3;
    }
  }
  
  module.exports = LancamentoExistente;