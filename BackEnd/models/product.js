const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    stock: {
      xsmall: { type: Number, required: true },
      small: { type: Number, required: true },
      medium: { type: Number, required: true },
      large: { type: Number, required: true },
      xlarge: { type: Number, required: true },
    },
    category: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    sale: {
      type: Number,
    },
    salePrice: {
      type: Number,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
