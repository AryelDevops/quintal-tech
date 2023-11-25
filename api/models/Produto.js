const mongoose = require("mongoose");

const ProdutoSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
  },
});

const Produto = mongoose.model("Produto", ProdutoSchema);

module.exports = Produto;
