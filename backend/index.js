const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = require("./config/db");
// test database connection

app.get("/", (req, res) => {
  res.send("Index");
});

app.use("/api/v1/users", require("./routes/user"));
app.use("/api/v1/products", require("./routes/product"));

const port = 7000;

db.authenticate()
  .then(() => console.log("Database connected successfully..."))
  .catch((err) => console.log(`Error Connecting to database: ${err}`));

app.listen(port, () => {
  console.log(`Server live on PORT:${port}`);
});
