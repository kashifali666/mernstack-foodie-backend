const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  order_data: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      size: { type: String, required: true },
      price: { type: Number, required: true },
      img: { type: String, required: false },
    },
  ],
  order_date: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
