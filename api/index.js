const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const config = require("config");
const NaoEncontrado = require("./erros/NaoEncontrado");
const CampoInvalido = require("./erros/CampoInvalido");
const DadosNaoFornecidos = require("./erros/DadosNaoFornecidos");

app.use(bodyParser.json());

const router = [require("./rotas/receitas"), require("./rotas/despesas")];
app.use("/receitas", router[0]);
app.use("/despesas", router[1]);

app.use((erro, req, res, next) => {
  let status = 500;

  if (erro instanceof NaoEncontrado) {
    status = 404;
  }

  if (erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos) {
    status = 400;
  }

  res.status(status);
  res.send(
    JSON.stringify({
      mensagem: erro.message,
      id: erro.idErro,
    })
  );
});

app.listen(config.get("api.porta"), () => console.log("Funcionando"));
