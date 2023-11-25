const express = require("express");
const router = express.Router();
const Venda = require("../models/Venda"); // Adjust the path according to your project structure
const connect = require("../db/Connect");

router.post("/vendas", (req, res) => {
  connect();
  const venda = new Venda(req.body);
  venda.totalValue = venda.unitValue * venda.amount;
  venda
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ message: err.message }));
});

module.exports = router;
