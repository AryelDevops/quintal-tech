// // Rota para criar um novo produto
// const express = require('express');
// const router = express.Router();

// router.post('/produtos', async (req, res) => {
//     try {
//       // Crie um novo produto com base nos dados da solicitação
//       const novoProduto = new Produto(req.body);
//       // Salve o produto no banco de dados
//       await novoProduto.save();
//       res.status(201).json(novoProduto);
//     } catch (error) {
//       res.status(500).json({ erro: 'Ocorreu um erro ao criar o produto' });
//     }
//   });
// module.exports = router;