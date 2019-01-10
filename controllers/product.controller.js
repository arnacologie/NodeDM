const Product = require('../models/product.model');
const fs = require('fs');

exports.createProduct = function(req, res){
    let product = new Product(
        {
            reference: req.body.reference,
            name: req.body.name,
            description : req.body.description,
            priceHT : req.body.priceHT,
            TVARate : req.body.TVARate
        }
    );
    product.save((err) => {
        if(err){
            console.log(err);
        }else{
            console.log('Product created :');
        }
        res.send(product);
    })
}

exports.getProducts = function(req, res){
    Product.find(function(err, product){
        if(err){
            console.log(err);
        }
        res.send(product);
    });
}

exports.findProduct = function(req, res){
    let id = req.params.id;
    Product.findById(id, function(err, product){
        if(err){
            console.log(err);
        }
        res.send(product);
    });
}

exports.deleteProduct = function(req, res){
    let id = req.params.id;
    Product.findByIdAndDelete(id, function(err, product){
        if(err){
            console.log(err);
        }
        res.send("HAS BEEN DELETED : "+product)
    });
}

exports.updateProduct = function(req, res){
    let id = req.params.id;
    Product.findByIdAndUpdate(id, req.body, function(err){
        if(err){
            console.log(err);
        }
        Product.findById(id, function(err, product){
            if(err){
                console.log(err);
            }
            res.send(product);
        });
    });
}

exports.deleteProducts = function(req, res){
    // Product.deleteMany({ name: /req.params.name/ }, function(err){
    //     if(err){
    //         console.log(req.body);
    //     }
    //     res.send("DELETED for matching"+res.body.name);
    // });
    let deleteManyFile = fs.readFileSync('./html/deleteMany.html', 'UTF-8');
    res.send(deleteManyFile);
}

