const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const BOOKINGS_FILE = path.join(__dirname, "bookings.json");

function loadBookings() {
  if (!fs.existsSync(BOOKINGS_FILE)) {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify([]));
  }
  const data = fs.readFileSync(BOOKINGS_FILE);
  return JSON.parse(data);
}

function saveBookings(bookings) {
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
}

app.get("/bookings", (req, res) => {
  const bookings = loadBookings();
  res.json(bookings);
});

app.post("/bookings", (req, res) => {
  const bookings = loadBookings();
  bookings.push(req.body);
  saveBookings(bookings);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
