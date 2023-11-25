const express = require("express");
const router = express.Router();
const Produto = require("../models/Produto");
const Estoque = require("../models/Estoque");
const connect = require("../db/Connect");

router.post("/produtos", (req, res) => {
  connect();
  const produto = new Produto(req.body);
  produto
    .save()
    .then((data) => {
      estoque = new Estoque({
        productId: data._id,
        value: 0,
        productDescription: data.description,
        productCode: data.code,
      });
      estoque.save().then((data) => console.log(data));
      res.json(data);
    })
    .catch((err) => res.status(500).json({ message: err.message }));
});
router.get("/produtos", async (req, res) => {
  try {
    connect();
    const produtos = await Produto.find();
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.get("/produtos/:code", async (req, res) => {
  try {
    connect();
    const produto = await Produto.findOne({ code: req.params.code });
    res.status(200).json(produto);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.delete("/produtos/:id", (req, res, next) => {
  connect();
  const id = req.params.id;
  Produto.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
router.patch("/produtos/:id", (req, res, next) => {
  const updates = req.body;
  if (ObjectId.isValid(req.params.id)) {
    Produto.updateOne({ _id: ObjectId(req.params.id) }, { $set: updates })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: "Não foi possível atualizar o documento" });
      });
  } else {
    res.status(500).json({ error: "Id inválido" });
  }
});

module.exports = router;
