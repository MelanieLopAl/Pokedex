const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const infoPk_pkSchema = new Schema ({
    Image: String,
    nombre: String, 
    description: String,
    tipo:String, 
  debilidad: String,
  evolution: String
}, {collection : 'info-pk'})

const infoPk = mongoose.model('infoPk', infoPk_pkSchema);

module.exports = infoPk;
