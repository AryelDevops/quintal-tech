const express = require('express');
const router = express.Router();
const Compra = require('../models/Compra'); // Adjust the path according to your project structure
const connect = require('../db/Connect');

router.post('/compras', (req, res) => {
  connect();
  console.log(req.body);
  const compra = new Compra(req.body);
  console.log(compra);
  compra.save()
      .then(data => res.json(data))
      .catch(err => res.status(500).json({message: err.message}));
});

module.exports = router;