const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoute");

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api", authRoutes);

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
