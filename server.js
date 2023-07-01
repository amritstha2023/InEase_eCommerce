import express from "express";
import colors from "colors";
import dotenv from "dotenv";
// import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import bodyParser from "body-parser";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

//configure env
dotenv.config();

//database config
connectDB();

// rest object

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//middlewares
app.use(cors());

// app.use(morgan('dev'));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api
// app.get("/", (req, res) =>{
//   res.send("<h1>Welcome to MERN eCommerce app</h1>");
// });

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} on http://localhost:${PORT}`
      .bgBlue.white
  );
});
