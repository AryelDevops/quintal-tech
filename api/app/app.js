// Inicie o servidor na porta desejada
const express = require("express");
const compras = require("../routes/compras");
const produtos = require("../routes/produtos");
const usuario = require("../routes/usuario");
const vendas = require("../routes/vendas");
const estoque = require("../routes/estoque");
const lucros = require("../routes/lucros");
const app = express();
const port = 3000; //porta padrão

app.use(require("cors")());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", compras);
app.use("/", produtos);
app.use("/", usuario);
app.use("/", vendas);
app.use("/", estoque);
app.use("/", lucros);
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
