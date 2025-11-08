// index.js
import express from "express";
import "dotenv/config";
import connectToDB from "./config/db.js";
import dentistsRoutes from "./routes/dentistsRoutes.js"; // <-- .js + default export

const app = express();

// ----- Middlewares -----
app.use(express.json());

// CORS (you can replace with the `cors` package if you prefer)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    return res.status(200).json({});
  }
  next();
});

app.use((req, _, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// ----- DB -----
connectToDB();

// ----- Routes -----
app.use("/api/dentists", dentistsRoutes);

// ----- Listen -----
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
