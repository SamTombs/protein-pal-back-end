const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,

    },
    protein: {
      type: Number,
    },
  },
  { timestamps: true }
);

const shoppingListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    items: [itemSchema],
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const ShoppingList = mongoose.model("ShoppingList", shoppingListSchema);

module.exports = ShoppingList;
