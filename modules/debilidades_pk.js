const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const debilidades_pkSchema = new Schema ({
    debilidad: String
}, {collection : 'debilidades_pk'})

const Debilidades_pk = mongoose.model('Debilidades_pk', debilidades_pkSchema);

module.exports = Debilidades_pk;