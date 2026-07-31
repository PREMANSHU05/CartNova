require("dotenv").config();
const app = require("./app");
const { connect, connection } = require("mongoose");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const PORT = process.env.PORT || 5000;

const startserver = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};
startserver();
