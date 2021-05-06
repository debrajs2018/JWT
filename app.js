const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./src/router/Router.js");
const app = express();
app.use(cors());
mongoose.connect("mongodb+srv://debrajs2018:jardebmanI*92088@cluster0.pm7ua.mongodb.net/QuickPoll?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connection with db is suucessful ");
})
    .catch((err) => {
        console.log(`Issue while connecting ieth `)
    })
app.use(express.json());
app.use(router);
module.exports = app;