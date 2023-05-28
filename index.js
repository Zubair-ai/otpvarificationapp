import express from "express";
import connectDB from "./db.js";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import LoginUser from "./routes/LoginUser.js";
import VarifyOtp from "./routes/VerifyOtp.js";
import path from "path";
import {fileURLToPath} from "url"
const app = express();

dotenv.config();
connectDB();


const __filename=fileURLToPath(import.meta.url);
const __dirname= path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


app.use("/api", LoginUser);
app.use("/api", VarifyOtp);

// app.get('/', (req, res) => {
//     res.send('Hello, World!');
//   }); 

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html")),
    function (err) {
      res.status(500).send(err);
    };
});

const PORT = process.env.PORT || 8000;

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
  