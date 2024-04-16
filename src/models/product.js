const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  discount: { type: Number },
  discountType: { type: String },
  quantity: { type: Number },
  category: { type: String },
  image: { type: String }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
