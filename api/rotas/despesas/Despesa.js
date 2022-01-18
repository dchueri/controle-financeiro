const TabelaDespesa = require("./TabelaDespesa");
const CampoInvalido = require("../../erros/CampoInvalido");
const DadosNaoFornecidos = require("../../erros/DadosNaoFornecidos");


class Despesa {
  constructor({ id, descricao, valor, dataCriacao, dataAtualizacao }) {
    this.id = id;
    this.descricao = descricao;
    this.valor = valor;
    this.dataCriacao = dataCriacao;
    this.dataAtualizacao = dataAtualizacao;
  }

  async criar() {
    this.validar();
    const resultado = await TabelaDespesa.inserir({
      descricao: this.descricao,
      valor: this.valor,
    });

    this.id = resultado.id;
    this.dataCriacao = resultado.dataCriacao;
    this.dataAtualizacao = resultado.dataAtualizacao;
  }

  async carregar() {
    const despesaEncontrada = await TabelaDespesa.pegarPorId(this.id);
    this.descricao = despesaEncontrada.descricao;
    this.valor = despesaEncontrada.valor;
    this.dataCriacao = despesaEncontrada.dataCriacao;
    this.dataAtualizacao = despesaEncontrada.dataAtualizacao;
  }

  async atualizar() {
    await TabelaDespesa.pegarPorId(this.id);
    const dadosParaAtualizar = {};

    if (typeof this.descricao === "string" && this.descricao.length > 0) {
      dadosParaAtualizar.descricao = this.descricao;
    } 
    
    if (typeof this.valor === "number" && this.valor > 0) {
      dadosParaAtualizar.valor = this.valor;
    }

    if (Object.keys(dadosParaAtualizar).length === 0) {
      throw new DadosNaoFornecidos();
    }

    await TabelaDespesa.atualizar(this.id, dadosParaAtualizar);
  }

  remover() {
    return TabelaDespesa.remover(this.id);
  }

  validar() {
    if (typeof this.descricao !== "string" || this.descricao.length === 0) {
      throw new CampoInvalido("descricao")
    } 
    
    if (typeof this.valor !== "number" || this.valor === 0) {
      throw new CampoInvalido("valor")      
    }
  }
}

module.exports = Despesa;
