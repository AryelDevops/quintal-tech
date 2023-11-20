const express = require('express');
const router = express.Router();
const Compra = require('../models/Compra'); // Adjust the path according to your project structure
const connect = require('../db/Connect');
const { ObjectId } = require('mongodb');

router.post('/compras', (req, res) => {
  connect();
  console.log(req.body);
  const compra = new Compra(req.body);
  console.log(compra);
  compra.save()
      .then(data => res.json(data))
      .catch(err => res.status(500).json({message: err.message}));
});

router.get('/compras', async (req, res) => {
  try {
    connect();
    const compras = await Compra.find()
    res.status(200).json(compras)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.get('/compras/:id', async (req, res) => {
  try {
    connect();
    const compras = await Compra.findById(req.params.id)
    res.status(200).json(compras)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.delete("/compras/:id", (req, res, next) => {
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
router.patch("/compras/:id", (req, res, next) => {
  const updates = req.body
  if(ObjectId.isValid(req.params.id)){
    Compra.updateOne({_id: ObjectId(req.params.id)}, {$set: updates})
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