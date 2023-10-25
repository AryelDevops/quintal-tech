const mongoose = require('mongoose');

// Defina o modelo de dados para fornecedores
const FornecedorSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  cnpj: {
    type: String,
    required: true,
    unique: true
  },
  contato: {
    nomeContato: String,
    email: String,
    telefone: String
  },
  endereco: {
    rua: String,
    cidade: String,
    estado: String,
    cep: String
  }
});

const Fornecedor = mongoose.model('Fornecedor', FornecedorSchema);

module.exports = Fornecedor;
