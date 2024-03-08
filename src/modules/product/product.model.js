import { Schema, model } from "mongoose";

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  desc: {
    type: String,
    required: [true, "La descripcion es obligatoria"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
  },
  stock: {
    type: Number,
    required: [true, "Quantity is required"],
    default: 1,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is required"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default model("Product", ProductSchema);
