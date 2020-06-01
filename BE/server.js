const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const { mountRoutes } = require("./routes")

mountRoutes(app)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"))

mongoose.connect('mongodb://localhost/ecommerce', {
    useNewUrlParser:
        true
}).then(() =>
    console.log('connected to mongodb'))
    .catch((err) =>
        console.error('could not connect to mongodb', err))

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('listening on port', port)
})