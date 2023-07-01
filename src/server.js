const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const sequelize = require('./database/db');
const User = require("./models/user");
const { authRouter } = require("./routes");

const { EXPRESS_PORT } = require('./config/config');

const app = express();
const router = express.Router();

app.use(cors());

app.use(express.json()); 

app.use(express.urlencoded({ extended: true }));


router.use("/auth", authRouter);

app.use(router);


app.listen(EXPRESS_PORT,() => {
    console.log(`listening on port ${EXPRESS_PORT}`)
});