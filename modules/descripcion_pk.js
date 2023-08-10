const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const descripcion_pkSchema = new Schema ({
    descripcion: String
}, {collection : 'descripcion_pk'})

const Descripcion_pk = mongoose.model('Descripcion_pk', descripcion_pkSchema);

module.exports = Descripcion_pk;
