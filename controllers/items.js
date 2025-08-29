const express = require("express");
const verifyToken = require("../middleware/verify-token.js");
const ShoppingList = require("../models/list.js");
const axios = require("axios");
const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    const response = await axios.get(
      "https://world.openfoodfacts.org/cgi/search.pl",
      {
        params: {
          action: "process",
          sort_by: "nutriments_proteins_100g",
          page_size: 30,
          json: true,
        },
      }
    );

    const items = response.data.products.map((p) => ({
      id: p.code,
      name: p.product_name,
      brand: p.brands,
      protein: p.nutriments.proteins_100g || 0,
      image: p.image_url || null,
    }));

    items.sort((a, b) => b.protein - a.protein);

    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

module.exports = router;
