const express = require("express");
const app = express();
const mongoDB = require("./db.js");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const PORT = process.env.PORT;

mongoDB();

app.use(
  cors({
    origin: "https://mernstack-foodie-frontend.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(express.json());
app.use("/api", require("./routes/createUser.js"));
app.use("/api", require("./routes/DisplayData"));
app.use("/api", require("./routes/OrderData"));

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
