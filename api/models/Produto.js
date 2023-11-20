const mongoose = require('mongoose');

// Defina o modelo de dados para produtos de verdura
const ProdutoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  variedade: String,
  dataPlantio: Date,
  dataColheita: Date,
  fornecedor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fornecedor'
  },
  custo: Number,
  precoVenda: Number,
  quantidadeEstoque: Number
});

const Produto = mongoose.model('Produto', ProdutoSchema);

module.exports = Produto;
