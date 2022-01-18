const router = require("express").Router();
const TabelaReceita = require("./TabelaReceita");
const Receita = require("./Receita");

router.get("/", async (req, res) => {
  const resultados = await TabelaReceita.listar();
  res.status(200);
  if (resultados.length > 0) {
    res.send(JSON.stringify(resultados));
  } else {
    res.send(JSON.stringify("Você não possui receitas"));
  }
});

router.post("/", async (req, res, next) => {
  try {
    const dadosRecebidos = req.body;
    const receita = new Receita(dadosRecebidos);
    await receita.criar();
    res.status(201);
    res.send(JSON.stringify(receita));
  } catch (erro) {
    next(erro);
  }
});

router.get("/:idReceita", async (req, res, next) => {
  try {
    const id = req.params.idReceita;
    const receita = new Receita({ id: id });
    await receita.carregar();
    res.status(200);
    res.send(JSON.stringify(receita));
  } catch (erro) {
    next(erro);
  }
});

router.put("/:idReceita", async (req, res, next) => {
  try {
    const id = req.params.idReceita;
    const dadosRecebidos = req.body;
    const dados = Object.assign({}, dadosRecebidos, { id: id });
    const receita = new Receita(dados);
    await receita.atualizar();
    res.status(204);
    res.end();
  } catch (erro) {
    next(erro);
  }
});

router.delete("/:idReceita", async (req, res, next) => {
  try {
    const id = req.params.idReceita;
    const receita = new Receita({ id: id });
    await receita.carregar();
    await receita.remover();
    res.status(204);
    res.end();
  } catch (erro) {
    next(erro);
  }
});
module.exports = router;
