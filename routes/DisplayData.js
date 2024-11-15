const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/foodData", async (req, res) => {
  try {
    // Fetch directly from the collection instead of using global.food_items
    const foodItemsCollection = mongoose.connection.db.collection("food_items");
    const foodItemsData = await foodItemsCollection.find({}).toArray();

    // Fetching from the 'foodCategory' collection
    const foodCategoryCollection =
      mongoose.connection.db.collection("foodCategory");
    const foodCategoryData = await foodCategoryCollection.find({}).toArray();

    // Sending both collections' data in the response
    if (foodItemsData.length > 0 || foodCategoryData.length > 0) {
      res.status(200).json({
        food_items: foodItemsData,
        foodCategory: foodCategoryData,
      });
    } else {
      res.status(404).json({ message: "No data found in either collection" });
    }
  } catch (error) {
    console.error("Error in /foodData route:", error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
