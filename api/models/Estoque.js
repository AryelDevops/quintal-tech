const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EstoqueSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Produto",
  },
  value: {
    type: Number,
  },
  productCode: {
    type: Number,
  },
  productDescription: {
    type: String,
  },
});

module.exports = mongoose.model("Estoque", EstoqueSchema);
