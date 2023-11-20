const express = require('express');
const router = express.Router();
const {MongoClient, ObjectId} = require("mongodb");
async function connect(){
  if(global.db) return global.db;
    const conn = await MongoClient.connect("mongodb+srv://devcloud:DevCloud@cluster0.xgbzj7z.mongodb.net/");
    console.loh("Conectado ao MongoDB: ", conn.connection.host);
  if(!conn) return new Error("Can't connect");
    global.db = await conn.db("unifor");
  return global.db;
}
//rota de exemplo
router.get('/sample', (req, res) => {
    res.send('Hello World!');
});

module.exports = router;