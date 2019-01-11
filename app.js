const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productController = require('./controllers/product.controller.js');
const fs = require('fs');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

const port = 3000;
const apiPath = '/api/v1/products';

app.listen(port, () => {
    console.log(`server on on port ${port}`)
});


mongoose.connect('mongodb://arnacologie1:arnacologie1@ds251804.mlab.com:51804/arnacobase',  { useNewUrlParser: true } , (err) => {
    if(err){
        console.log(('database not connected'));
    }
    else{
        console.log('database connected');
    }
});

//welcome
app.get(`/`, (req, res) => {
    res.send('"Je ne parviens pas à vous identifier"');
});
app.get(`/:name`, (req, res) => {
    res.send(`Bonjour ${req.params.name}, Bienvenue sur votre API de gestion de catalogue produit.`)
});

//CRUD Product
//create
app.get(`${apiPath}/create`, (req, res)=>{
    let createFile = fs.readFileSync('./html/create.html', 'UTF-8');
    res.send(createFile);
});
app.post(`${apiPath}/create`, productController.createProduct);
//read
app.get(`${apiPath}/read/:id`, productController.findProduct);
app.get(`${apiPath}/read`, productController.getProducts);
//update
app.put(`${apiPath}/update/:id`, productController.updateProduct);
app.put(`${apiPath}/update`, productController.updateProducts);
//delete
app.get(`${apiPath}/delete/:id`, productController.deleteProduct);
app.get(`${apiPath}/delete`, productController.deleteProductsGet);
app.post(`${apiPath}/delete`,  productController.deleteProductsPost);
//calculatetaxe
app.get(`${apiPath}/calculate-taxe/:id`,  productController.calculateTaxe);
