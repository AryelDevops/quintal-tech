// // Rota para registrar vendas
// const express = require('express');
// const router = express.Router();

// router.post('/vendas', async (req, res) => {
//     try {
//       const { produto, quantidade, precoVenda, cliente } = req.body;
  
//       // Verifique se há estoque disponível para a venda
//       const produtoVendido = await Produto.findById(produto);
//       if (produtoVendido.quantidadeEstoque < quantidade) {
//         return res.status(400).json({ erro: 'Estoque insuficiente para a venda' });
//       }
  
//       // Crie uma nova entrada no estoque para a venda
//       const movimentacao = new MovimentacaoEstoque({
//         produto,
//         tipo: 'venda',
//         quantidade
//       });
  
//       // Atualize o estoque do produto
//       const produtoAtualizado = await Produto.findByIdAndUpdate(produto, {
//         $inc: { quantidadeEstoque: -quantidade }
//       });
  
//       res.status(201).json({ mensagem: 'Venda registrada com sucesso' });
//     } catch (error) {
//       res.status(500).json({ erro: 'Ocorreu um erro ao registrar a venda' });
//     }
//   });
  
//   module.exports = router;