const express = require("express");
const hostname = "127.0.0.1";
const PORT = process.env.PORT || 1337;
const app = require("express")();
const path = require("path");
const cors = require("cors");
const shortid = require("shortid");
const Razorpay = require("razorpay");
const store = require("store");

const razorpay = new Razorpay({
  key_id: "rzp_test_RUdUif7nYHpw1g",
  key_secret: "Er8LXMN6FdUpj66LnGjBZ8lO",
});

app.use(cors());
app.use(express.json());

app.get("/logo.png", (req, res) => {
  res.sendFile(path.join(__dirname, "logo.png"));
});

app.get("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Server Responded");
});

app.post("/amount", (req, res) => {
  const body = req.body;
  store.set("totalData", { total: body.amount });
  res.send("OK");
});

app.post("/razorpay", async (req, res) => {
  const payment_capture = 1;
  const amount = store.get("totalData").total;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

const DEVELOPMENT = process.env.BUILD_TYPE_PRODUCTION;
const PRODUCTION = process.env.BUILD_TYPE_DEVELOPMENT;

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, hostname, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
});
