const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const app = express();

app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/subsection", require("./routes/subsection.routes"));
app.use("/api/article", require("./routes/article.routes"));

const PORT = config.get("port") || 5000;

// Call this method to connect to DB
async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      // We neww theese parameters in order for "connect" to work properly
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    // Start project after connecting to DB
    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}...`);
    });
  } catch (e) {
    console.log(`Server error: ${e.message}`);
    process.exit(1);
  }
}

start();
