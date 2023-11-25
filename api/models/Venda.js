const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VendaSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Produto",
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    unitValue: {
      type: Number,
      required: true,
    },
    totalValue: {
      type: Number,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Venda = mongoose.model("Venda", VendaSchema);

module.exports = Venda;
