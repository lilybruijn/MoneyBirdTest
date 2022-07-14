const express = require("express");
const cors = require("cors");
const app = express();


// Init middleware
app.use(cors());
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("API Running");
});

// Define routes

// User Routes
app.use("/apis/moneybird/invoices/", require("./routes/apis/moneybird/invoices"));
app.use("/apis/moneybird/users/", require("./routes/apis/moneybird/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
