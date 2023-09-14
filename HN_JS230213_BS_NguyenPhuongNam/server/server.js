// create server
const express = require("express");
const app = express();

//require package
const bodyParser = require("body-parser");
const port = 9999;
const morgan = require("morgan");
const cors = require("cors");
const db = require("./ultils/database");

//require routes
const todoRoutes = require("./routes/todo.routes");

//setup routes
app.use("/api/v1/todos", todoRoutes);

// use package
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

app.listen(port, () => {
  console.log(`Đang phát tại cổng http://localhost:${port}`);
});
