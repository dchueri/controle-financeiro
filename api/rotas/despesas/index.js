const router = require("express").Router();
const TabelaDespesa = require("./TabelaDespesa");
const Despesa = require("./Despesa");

router.get("/", async (req, res) => {
  const resultados = await TabelaDespesa.listar();
  res.status(200);
  if (resultados.length > 0) {
    res.send(JSON.stringify(resultados));
  } else {
    res.send(JSON.stringify("Você não possui despesas"));
  }
});

router.post("/", async (req, res, next) => {
  try {
    const dadosRecebidos = req.body;
    const despesa = new Despesa(dadosRecebidos);
    await despesa.criar();
    res.status(201);
    res.send(JSON.stringify(despesa));
  } catch (erro) {
    next(erro);
  }
});

router.get("/:idDespesa", async (req, res, next) => {
  try {
    const id = req.params.idDespesa;
    const despesa = new Despesa({ id: id });
    await despesa.carregar();
    res.status(200);
    res.send(JSON.stringify(despesa));
  } catch (erro) {
    next(erro);
  }
});

router.put("/:idDespesa", async (req, res, next) => {
  try {
    const id = req.params.idDespesa;
    const dadosRecebidos = req.body;
    const dados = Object.assign({}, dadosRecebidos, { id: id });
    const despesa = new Despesa(dados);
    await despesa.atualizar();
    res.status(204);
    res.end();
  } catch (erro) {
    next(erro);
  }
});

router.delete("/:idDespesa", async (req, res, next) => {
  try {
    const id = req.params.idDespesa;
    const despesa = new Despesa({ id: id });
    await despesa.carregar();
    await despesa.remover();
    res.status(204);
    res.end();
  } catch (erro) {
    next(erro);
  }
});
module.exports = router;
