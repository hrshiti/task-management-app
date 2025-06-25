const dotenv = require('dotenv');
const express = require('express');
const app = express();
const productRouter = require('./routers/product-router.js');
const authRouter = require('./routers/auth-router.js');
const taskRouter = require('./routers/task-router.js');
const connetDb = require('./utils/db.js');
const cors = require('cors');
const errorMiddleware = require('./middlewares/error-middleware.js');

require("dotenv").config();

const corsOptions = {
  origin: ['http://localhost:5173', 'https://neon-frangollo-1457cd.netlify.app'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};


app.use(cors(corsOptions));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use("/productApi", productRouter);
app.use("/authApi", authRouter);
app.use("/taskApi", taskRouter);

app.use(errorMiddleware); 
connetDb()
    .then(() => {
        app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
        console.log("Database connected successfully");
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
        process.exit(1);
    });
