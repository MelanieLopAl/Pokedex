const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const nombre_pkSchema = new Schema ({
    nombre: String
}, {collection : 'nombre_pk'})

const Nombre_pk = mongoose.model('Nombre_pk', nombre_pkSchema);

module.exports = Nombre_pk;