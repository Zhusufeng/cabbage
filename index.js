const express = require("express");
const multer = require("multer");
const { initializeDatabase } = require("./db");
const {
  getTransaction,
  createTransaction,
  createBulkTransactions,
} = require("./transaction");

const upload = multer();
const app = express();
const port = 8080;

async function startServer() {
  app.use(express.json());

  await initializeDatabase();

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("/transactions", getTransaction);

  app.post("/transactions", createTransaction);

  app.post(
    "/transactions/bulk",
    upload.single("csvFile"),
    createBulkTransactions
  );

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

startServer();
