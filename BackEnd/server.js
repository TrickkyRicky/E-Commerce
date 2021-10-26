// used to forge a direct path to the images folder
const path = require("path");
// framework for node js
const express = require("express");
// used to parse buffers from incoming body req via post,put,etc.
const bodyParser = require("body-parser");
// used to make querying easier to mongodb
const mongoose = require("mongoose");
// used to parse incoming body req jpeg, jpg, png images for website
const multer = require("multer");
const cors = require("cors");

const server = express();

// access to env variables
require("dotenv").config();

/* --------- Routes ---------- */

const authRoute = require("./routes/auth.js");
const adminRoute = require("./routes/admin.js");
const shopRoute = require("./routes/shop.js");

/* --------- Image handling ---------- */

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

/* --------- middleware ---------- */

server.use(cors());

// might change back to bodyParser.json() <---is deprecated
server.use(express.json());
// uses the defined filter and storage abouve to parse image into place
server.use(
  multer({
    limits: { fieldSize: 25 * 1024 * 1024 },
    storage: fileStorage,
    fileFilter: fileFilter,
  }).single("image")
);
// serves images statically front end
server.use("/images", express.static(path.join(__dirname, "images")));

// allows the use of REST from other clients on other Ports via the following request
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// route middleware with built in validation
server.use("/auth", authRoute);
server.use("/admin", adminRoute);
server.use("/shop", shopRoute);

if (process.env.NODE_ENV === "production") {
  server.use(express.static("FrontEnd/build"));
  server.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../FrontEnd", "build", "index.html"));
  });
} else {
  server.get("/", (req, res) => {
    res.send("API RUNNING");
  });
}

// error redirection middleware
server.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});
const port = process.env.PORT || 5000;
console.log(process.env);
mongoose
  .connect(process.env.DB_URI, {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(port);
  })
  .then(() => {
    console.log(port);
    console.log("MONGO CONNECTED");
  })
  .catch(() => {
    console.log("WE DIDNT CONNECT");
  });
