const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

// Route to handle placing orders
router.post("/orderData", async (req, res) => {
  const { email, order_data, order_date } = req.body;

  // Log the email to make sure it's being received
  console.log("Received email:", email);

  // Check if email is provided in the request body
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  // Check if order_data is provided in the request body
  if (!order_data || order_data.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Order data is required" });
  }

  // Process the order data...
  try {
    let order = await Order.findOneAndUpdate(
      { email: email },
      {
        $push: { order_data: { $each: order_data } },
        $set: { order_date: order_date },
      },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      message: "Order placed/updated successfully",
      order,
    });
  } catch (error) {
    console.error("Error while processing the order:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Route to fetch order data
router.post("/myorderData", async (req, res) => {
  try {
    const myData = await Order.findOne({ email: req.body.email });
    if (!myData) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found" });
    }
    res.json({ orderData: myData });
  } catch (error) {
    console.error("Error fetching order data:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
