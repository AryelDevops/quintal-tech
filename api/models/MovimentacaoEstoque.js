const mongoose = require('mongoose');

const MovimentacaoEstoqueSchema = new mongoose.Schema({
  produto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produto',
    required: true
  },
  tipo: {
    type: String,
    enum: ['compra', 'venda', 'descarte'],
    required: true
  },
  quantidade: {
    type: Number,
    required: true
  },
  data: {
    type: Date,
    default: Date.now
  }
});

const MovimentacaoEstoque = mongoose.model('MovimentacaoEstoque', MovimentacaoEstoqueSchema);

module.exports = MovimentacaoEstoque;
