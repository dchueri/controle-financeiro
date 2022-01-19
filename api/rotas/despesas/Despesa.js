const TabelaDespesa = require("./TabelaDespesa");
const CampoInvalido = require("../../erros/CampoInvalido");
const DadosNaoFornecidos = require("../../erros/DadosNaoFornecidos");
const moment = require("moment");
const Sequelize = require("sequelize");
const Services = require("./Services");
const LancamentoExistente = require("../../erros/LancamentoExistente");

const Op = Sequelize.Op;
const services = new Services("Despesas");

class Despesa {
  constructor({ id, descricao, valor, data }) {
    this.id = id;
    this.descricao = descricao;
    this.valor = valor;
    this.data = data;
  }

  async criar() {
    this.validar();
    const inicioDoMes = moment(this.data).startOf("month").format("YYYY-MM-DD");
    const finalDoMes = moment(this.data).endOf("month").format("YYYY-MM-DD");
    console.log(inicioDoMes);
    console.log(finalDoMes);
    const despesa = await services.validaExistencia({
      descricao: this.descricao,
      data: {
        [Op.gte]: inicioDoMes,
        [Op.lte]: finalDoMes,
      },
    });

    if (despesa) {
      throw new LancamentoExistente("despesa");
    }

    const resultado = await TabelaDespesa.inserir({
      descricao: this.descricao,
      valor: this.valor,
      data: this.data,
    });

    this.id = resultado.id;
  }

  async carregar() {
    const despesaEncontrada = await TabelaDespesa.pegarPorId(this.id);
    this.descricao = despesaEncontrada.descricao;
    this.valor = despesaEncontrada.valor;
    this.data = despesaEncontrada.data;
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

    if (this.data.length === 10) {
      dadosParaAtualizar.data = this.data;
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
      throw new CampoInvalido("descricao");
    }

    if (typeof this.valor !== "number" || this.valor === 0) {
      throw new CampoInvalido("valor");
    }

    if (this.data.length !== 10) {
      throw new CampoInvalido("data");
    }
  }
}

module.exports = Despesa;
