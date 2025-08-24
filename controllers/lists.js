const express = require("express");
const verifyToken = require("../middleware/verify-token.js");
const ShoppingList = require("../models/list.js");
const router = express.Router();

// Shopping Lists Page
router.get("/", verifyToken, async (req, res) => {
  try {
    const lists = await ShoppingList.find({}).populate("author");
    res.status(200).json(lists);
  } catch (error) {
    console.log(error);
  }
});

// Create new list

router.post("/", verifyToken, async (req, res) => {
  try {
    const createList = await ShoppingList.create({
      ...req.body,
      author: req.user._id,
    });
    await createList.populate("author");

    res.status(201).json(createList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Update List

router.put("/:listId", verifyToken, async (req, res) => {
  try {
    const updatedList = await ShoppingList.findByIdAndUpdate(
      req.params.listId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedList);
  } catch (error) {
    console.log(error);
  }
});

// Delete List

router.delete("/:listId", verifyToken, async (req, res) => {
  try {
    const deletedList = await ShoppingList.findByIdAndDelete(req.params.listId);
    res.status(200).json(deletedList);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
