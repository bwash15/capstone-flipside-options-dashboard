require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const credentials = require('./Middleware/credentials');
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("build"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(path.basename(path.dirname(filename)),  "build", "index.html"));
    });
  }
 
const port = process.env.proxy || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
