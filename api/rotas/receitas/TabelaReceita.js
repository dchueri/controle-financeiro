const Modelo = require("./ModeloTabelaReceita");
const NaoEncontrado = require("../../erros/NaoEncontrado");

module.exports = {
  listar() {
    return Modelo.findAll();
  },
  inserir(receita) {
    return Modelo.create(receita);
  },
  async pegarPorId(id) {
    const receitaEncontrada = await Modelo.findOne({
      where: {
        id: id,
      },
    });

    if (!receitaEncontrada) {
      throw new NaoEncontrado();
    }

    return receitaEncontrada;
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
