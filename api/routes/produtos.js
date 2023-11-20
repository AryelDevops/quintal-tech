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
router.get('/produtos', async (req, res) => {
  try {
    connect();
    const compras = await Produto.find()
    res.status(200).json(compras)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.get('/produtos/:id', async (req, res) => {
  try {
    connect();
    const compras = await Produto.findById(req.params.id)
    res.status(200).json(compras)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.delete("/produtos/:id", (req, res, next) => {
  connect();
  const id = req.params.id;
  Compra.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
router.patch("/produtos/:id", (req, res, next) => {
  const updates = req.body
  if(ObjectId.isValid(req.params.id)){
    Produto.updateOne({_id: ObjectId(req.params.id)}, {$set: updates})
    .then(result =>{
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json({error:"Não foi possível atualizar o documento"})
    })
  }else{
      res.status(500).json({error:"Id inválido"})
    }
});

module.exports = router;