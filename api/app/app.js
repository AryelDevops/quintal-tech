// Inicie o servidor na porta desejada
const express = require('express');
const sample = require('../routes/sample');
const compras = require('../routes/compras');
const produtos = require('../routes/produtos');
const app = express();
const port = 3000; //porta padrão



app.use(require('cors')());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', sample);
app.use('/', compras);
app.use('/', produtos);
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
