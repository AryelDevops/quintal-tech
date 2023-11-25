const express = require("express");
const router = express.Router();
const connect = require("../db/Connect");
const Usuario = require("../models/Usuario.js");

router.post("/autenticar", async (req, res) => {
  try {
    connect();
    const usuario = await Usuario.findOne({ email: req.body.email });
    if (usuario.password === req.body.password) {
      res.status(200).json(usuario);
    } else throw new Error("Usuário ou senha incorretos");
  } catch (error) {
    res.status(401).json({ erro: "Usuário ou senha incorretos." });
  }
});

router.post("/criar-usuario", (req, res) => {
  connect();
  const usuario = new Usuario(req.body);
  usuario
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ message: err.message }));
});

module.exports = router;
