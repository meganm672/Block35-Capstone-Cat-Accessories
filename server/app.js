const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
const { verifyAuthToken }= require('./auth/middleware');
// Logging middleware
app.use(morgan("dev"));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//token authentication
app.use(verifyAuthToken)

app.get("/test", (req, res, next) => {
  res.send("Test route");
});

// app.get('/', (req, res, next) => {
//   res.sendFile(path.join(__dirname, '../dist/index.html'));
// })



const apiRouter = require("./api");
app.use('/api', apiRouter);

const authRouter = require("./auth");
app.use('/auth', authRouter);

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('SERVER ERROR: ', error);
    if(res.statusCode < 400) {
        res.status(500);
    }
    res.send({
        error: error.message,
        name: error.name,
        message: error.message,
        table: error.table,
    });
});


  

module.exports = app;