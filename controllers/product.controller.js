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
        res.send(product+"____"+product.method);
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

//change priceHT (given w/JSON) of the products w/ description (given w/JSON)
exports.updateProducts = function(req, res){
    Product.updateMany({description: req.body.description}, {$set : {"priceHT" : req.body.priceHT}}, function(err){
        if(err){
            console.log(err);
        }
        //res.redirect('/api/v1/products/read');
        res.send("Updated");
        
    });
}

exports.deleteProductsGet = function(req, res){
    let deleteManyFile = fs.readFileSync('./html/deleteMany.html', 'UTF-8');
    //replace to fill the placeholder
    Product.find(function(err, products){
        if(err){
            console.log(err);
        }
        //console.log(products[0].name);
        deleteManyFile = mergeValues(products, deleteManyFile);
        res.send(deleteManyFile);
    });
    //console.log(deleteManyFile);
}

exports.deleteProductsPost = function(req, res){
   Product.deleteMany({_id: {$in: req.body.IDToDelete} }, function(err) {
       if(err){
           console.log(err);
       }
       res.redirect('/api/v1/products/delete');
       console.log(req.body.IDToDelete);
   })
}

exports.calculateTaxe = function (req, res){
    let id = req.params.id;
    Product.findById(id, function(err, product){
        if(err){
            console.log(err);
        }this.priceHT + (this.priceHT * this.TVARate / 100)
        res.send(product.calculateTaxe());
    });
}

//----------------------------FUNCTIONS-----------------------------------------/


function mergeValues(products, content){
    content = content.replace("{{placeholder}}", jsonToTable(products));
    return content;
}

function jsonToTable(json){
    let table = ''
    let result = '';
    for(let i = 0; i<json.length; i++){
        if(i == 0){
            table = `<table style="width:100%;text-align:center"><tr><th></th><th>ID</th><th>Reference</th><th>Name</th><th>Description</th><th>PriceHT</th><th>TVARate</th><th>Version</th></tr><tr><td><input id="IDToDelete"type="checkbox"name="IDToDelete"value="${json[i].id}"></td><td>${json[i].id}</td><td>${json[i].reference}</td><td>${json[i].name}</td><td>${json[i].description}</td><td>${json[i].priceHT}</td><td>${json[i].TVARate}</td><td>${json[i].__v}</td></tr>`;
            result+=table;
        }else{
            table = `<tr><td><input id="IDToDelete"type="checkbox"name="IDToDelete"value="${json[i].id}"></td><td>${json[i].id}</td><td>${json[i].reference}</td><td>${json[i].name}</td><td>${json[i].description}</td><td>${json[i].priceHT}</td><td>${json[i].TVARate}</td><td>${json[i].__v}</td></tr>`
            result+=table;
        }
    }
    result+='</table>';
    return result;
}