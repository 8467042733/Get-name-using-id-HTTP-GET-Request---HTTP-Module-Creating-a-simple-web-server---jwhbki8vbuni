const fs = require('fs');
const express = require('express');
const app = express();

// Importing productNames from names.json file
const productNames = JSON.parse(
    fs.readFileSync(`${__dirname}/data/names.json`)
);

//Middlewares
app.use(express.json())

// GET endpoint for sending the products to client by id
//Endpoint - /api/v1/names/:id
app.get('/api/v1/names/:id',(req, res) => {
    const params = req.params;
    const id = Number(params.id);

    if(isNaN(id)) {
        return res.status(404).send({
            status: "failed",
            message: "Not found!"
        });
    }
    const resObj = productNames.find(productName => productName.id === id);

    if(!resObj) {
        return res.status(404).send({
            status: "failed",
            message: "Not found!"
        });
    }else{
        res.status(200).send({
            status: 'success',
            message: "Product name fetched successfully",
            data: {productName:resObj}
        });
    }
})


module.exports = app;
