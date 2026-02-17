require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const seedDB = require("./seedEvent");

const PORT = process.env.PORT || 5000;

const initializingDBAndServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    await seedDB();

    await app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.log("DB Error:", err);
  }
};

initializingDBAndServer();

module.exports = initializingDBAndServer;
