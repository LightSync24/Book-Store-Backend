import express, { response } from "express";
import { PORT } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import bookRoutes from "./routers/bookRoutes.js";
import dotenv from "dotenv";

// Configure dotenv to read the .env file
dotenv.config();

const app = express();
app.use(express.json());

// for handling CORS policy
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Book Store");
});

app.use("/books", bookRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`App connnected to DB`);
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
