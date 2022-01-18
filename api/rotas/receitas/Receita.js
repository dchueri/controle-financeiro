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
    const campos = ["descricao", "valor"];
    const dadosParaAtualizar = {};

    campos.forEach((campo) => {
      const valor = this[campo];
      if (typeof valor === "string" && valor.length > 0) {
        dadosParaAtualizar[campo] = valor;
      }
    });

    if (Object.keys(dadosParaAtualizar).length === 0) {
      throw new DadosNaoFornecidos();
    }

    await TabelaReceita.atualizar(this.id, dadosParaAtualizar);
  }

  remover() {
    return TabelaReceita.remover(this.id);
  }

  validar() {
    const campos = ["descricao", "valor"];

    campos.forEach((campo) => {
      const valorDoCampo = this[campo];

      if (typeof valorDoCampo !== "string" || valorDoCampo.length === 0) {
        throw new CampoInvalido(campo);
      }
    });
  }
}

module.exports = Receita;
