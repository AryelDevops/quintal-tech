const express = require("express");
const router = express.Router();
const Venda = require("../models/Venda");
const Compra = require("../models/Compra");
const connect = require("../db/Connect");

router.get("/lucros/resultados", async (req, res) => {
  try {
    connect();
    const resultadoVenda = await Venda.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(req.query.startDate),
            $lte: new Date(req.query.endDate),
          },
        },
      },
      {
        $group: { _id: null, amount: { $sum: "$totalValue" } },
      },
    ]);

    const resultadoCompra = await Compra.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(req.query.startDate),
            $lte: new Date(req.query.endDate),
          },
        },
      },
      {
        $group: { _id: null, amount: { $sum: "$totalValue" } },
      },
    ]);

    res.status(200).json({
      result: resultadoVenda[0].amount - resultadoCompra[0].amount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ erro: error });
  }
});

router.get("/lucros/produtos", async (req, res) => {
  try {
    connect();
    const resultadoVenda = await Venda.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(req.query.startDate),
            $lte: new Date(req.query.endDate),
          },
        },
      },
      {
        $group: {
          _id: "$productId",
          amount: { $sum: "$totalValue" },
        },
      },
    ]);

    const resultadoCompra = await Compra.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(req.query.startDate),
            $lte: new Date(req.query.endDate),
          },
        },
      },
      {
        $group: {
          _id: "$productId",
          productDescription: { $first: "$productDescription" },
          amount: { $sum: "$totalValue" },
        },
      },
    ]);

    const result = resultadoCompra.map((compra) => {
      const venda = resultadoVenda.find(
        (venda) => venda._id.toString() === compra._id.toString()
      );

      return {
        _id: compra._id,
        productDescription: compra.productDescription,
        amount: -((compra || {}).amount || 0) + ((venda || {}).amount || 0),
      };
    });

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ erro: error });
  }
});

module.exports = router;
