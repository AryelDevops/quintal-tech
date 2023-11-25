const express = require("express");
const router = express.Router();
const Estoque = require("../models/Estoque"); // Adjust the path according to your project structure
const connect = require("../db/Connect");

router.get("/estoque", async (req, res) => {
  try {
    connect();
    const estoque = await Estoque.find();
    res.status(200).json(estoque);
  } catch (error) {
    console.log(error);
    res.status(500).json({ erro: error });
  }
});

router.patch("/estoque/:productCode", async (req, res, next) => {
  connect();

  const updates = req.body;
  const estoque = await Estoque.findOne({
    productCode: req.params.productCode,
  }).exec();

  if (req.params.productCode && estoque) {
    Estoque.updateOne(
      { productCode: req.params.productCode },
      {
        $set: {
          value: estoque.value + updates.value,
        },
      }
    )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ error: "Não foi possível atualizar o documento" });
      });
  } else {
    res.status(500).json({ error: "Código do produto inválido" });
  }
});

module.exports = router;
