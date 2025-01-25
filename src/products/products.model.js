import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    alias: 'currentPrice',
    required: true,
    min: 0,
  },
  oldPrice: {
    type: Number,
    required: false,
    min: 0,
  },
  image: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const Products = mongoose.model("Product", ProductSchema);
export default Products;
