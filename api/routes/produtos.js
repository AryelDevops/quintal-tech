const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto'); // Adjust the path according to your project structure
const connect = require('../db/Connect');

router.post('/produtos', (req, res) => {
  connect();
  console.log(req.body);
  const produto = new Produto(req.body);
  console.log(produto);
  produto.save()
      .then(data => res.json(data))
      .catch(err => res.status(500).json({message: err.message}));
});

module.exports = router;