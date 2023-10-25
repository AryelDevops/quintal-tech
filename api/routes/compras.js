// Rota para registrar compras
const express = require('express');
const router = express.Router();

router.post('/compras', async (req, res) => {
    try {
      const { produto, quantidade, custo, fornecedor } = req.body;
  
      // Crie uma nova entrada no estoque para a compra
      const movimentacao = new MovimentacaoEstoque({
        produto,
        tipo: 'compra',
        quantidade,
        custo
      });
      
      // Atualize o estoque do produto
      const produtoAtualizado = await Produto.findByIdAndUpdate(produto, {
        $inc: { quantidadeEstoque: quantidade }
      });
  
      res.status(201).json({ mensagem: 'Compra registrada com sucesso' });
    } catch (error) {
      res.status(500).json({ erro: 'Ocorreu um erro ao registrar a compra' });
    }
  });

module.exports = compras;