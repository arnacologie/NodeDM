const mongoose = require('mongoose');
const fs = require('fs');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    reference: Number,
    name: String,
    description: String,
    priceHT: Number,
    TVARate: Number
},
{
    collection:'products'
});

ProductSchema.method({
    calculateTaxe: function () {
        
        let calculatedTaxe = this.priceHT + (this.priceHT * this.TVARate / 100);
        let resultText = `The product '${this.name}' is worth ${calculatedTaxe}€ TTC ! <br><br><br>PrixHT(${this.priceHT}€) + ( PrixHT(${this.priceHT}€) * (TVARate(${this.TVARate})/100) ) = ${calculatedTaxe}€`;
        priceTTCtoLog(resultText);
        return resultText;
    }
});

function priceTTCtoLog(priceTTCText){
    priceTTCText = priceTTCText.replace("<br><br><br>", "\n\n");
    priceTTCText += `\n\n${new Date()}\n\n`;
    fs.appendFile('./assets/log.txt', priceTTCText, (error) => {
        if(error){
            console.log(error)
        }else {
            console.log('file edited');
        }
    });
}

module.exports = mongoose.model('Product', ProductSchema);



