import express, { json } from "express";
import { config } from "dotenv";
import connectDb from "./db.js";
import noteRoute from "./routes/notes.js";
import cors from "cors";
config();
connectDb();

const app = express();
app.use(json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Hey we are live");
});

// available routes
app.use(noteRoute);

app.listen(5000, () => {
  console.log("serever runing on port 5000");
});
