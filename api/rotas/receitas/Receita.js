const TabelaReceita = require("./TabelaReceita");
const CampoInvalido = require("../../erros/CampoInvalido");
const DadosNaoFornecidos = require("../../erros/DadosNaoFornecidos");


class Receita {
  constructor({ id, descricao, valor, dataCriacao, dataAtualizacao }) {
    this.id = id;
    this.descricao = descricao;
    this.valor = valor;
    this.dataCriacao = dataCriacao;
    this.dataAtualizacao = dataAtualizacao;
  }

  async criar() {
    this.validar();
    const resultado = await TabelaReceita.inserir({
      descricao: this.descricao,
      valor: this.valor,
    });

    this.id = resultado.id;
    this.dataCriacao = resultado.dataCriacao;
    this.dataAtualizacao = resultado.dataAtualizacao;
  }

  async carregar() {
    const receitaEncontrada = await TabelaReceita.pegarPorId(this.id);
    this.descricao = receitaEncontrada.descricao;
    this.valor = receitaEncontrada.valor;
    this.dataCriacao = receitaEncontrada.dataCriacao;
    this.dataAtualizacao = receitaEncontrada.dataAtualizacao;
  }

  async atualizar() {
    await TabelaReceita.pegarPorId(this.id);
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

    await TabelaReceita.atualizar(this.id, dadosParaAtualizar);
  }

  remover() {
    return TabelaReceita.remover(this.id);
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

module.exports = Receita;
