const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompraSchema = new Schema({
 product: {
   type: String,
   required: true
 },
 quantity: {
   type: Number,
   required: true
 },
 price: {
   type: Number,
   required: true
 },
 date: {
   type: Date,
   default: Date.now
 }
});

module.exports = mongoose.model('Compra', CompraSchema);