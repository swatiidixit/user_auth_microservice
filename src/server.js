const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();

const { EXPRESS_PORT } = require('./config/config');

const app = express();


app.use(cors());

app.use(express.json()); 

app.use(express.urlencoded({ extended: true }));


app.get("/",(req,res) => {
    res.send("getting res")
})



app.listen(EXPRESS_PORT,() => {
    console.log(`listening on port ${EXPRESS_PORT}`)
});