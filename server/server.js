const express = require("express");
const cors = require("cors");
require("dotenv").config();
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const morgan = require("morgan");
const nodemon = require("nodemon");
const slugify = require("slugify");
const blogRoute = require('./route/blog');

const app = express();

mongoose.connect('mongodb://localhost:27020/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


app.use('/api', blogRoute);

const port = process.env.PORT || 8080; // ใช้ค่า PORT จาก .env ถ้าไม่มีใช้ค่าเริ่มต้นคือ 8080
app.listen(port, () => console.log(`start server in port ${port}`));
