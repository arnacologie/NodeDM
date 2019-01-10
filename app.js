const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productController = require('./controllers/product.controller.js');
const fs = require('fs');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
//app.use(cors);

const port = 3000;
const apiPath = '/api/v1/product';

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

let createFile = fs.readFileSync('./html/create.html', 'UTF-8');
app.get('/', (req, res) => {
    res.send('Hello world');
});

//CRUD Product
app.get(`${apiPath}/create`, (req, res)=>{
    res.send(createFile);
});
app.post(`${apiPath}/create`, productController.createProduct);
app.get(`${apiPath}/read`, productController.getProducts);
app.get(`${apiPath}/read/:id`, productController.findProduct);
app.put(`${apiPath}/update/:id`, productController.updateProduct);
app.delete(`${apiPath}/delete/:id`, productController.deleteProduct);
app.get(`${apiPath}/delete`, productController.deleteProducts);
app.post(`${apiPath}/delete`, (req, res)=>{
    res.send(req.body);
});