const Modelo = require("./ModeloTabelaDespesa");
const NaoEncontrado = require("../../erros/NaoEncontrado");

module.exports = {
  listar() {
    return Modelo.findAll();
  },
  inserir(despesa) {
    return Modelo.create(despesa);
  },
  async pegarPorId(id) {
    const despesaEncontrada = await Modelo.findOne({
      where: {
        id: id,
      },
    });

    if (!despesaEncontrada) {
      throw new NaoEncontrado();
    }

    return despesaEncontrada;
  },
  atualizar(id, dadosParaAtualizar) {
    return Modelo.update(dadosParaAtualizar, {
      where: { id: id },
    });
  },
  remover(id) {
    return Modelo.destroy({
      where: { id: id },
    });
  },
};
