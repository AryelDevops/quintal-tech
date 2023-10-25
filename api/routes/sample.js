const express = require('express');
const router = express.Router();

//rota de exemplo
router.get('/sample', (req, res) => {
    res.send('Hello World!');
});

module.exports = router;