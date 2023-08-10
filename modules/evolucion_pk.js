const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const evolucion_pkSchema = new Schema ({
    evolucion: {
      enum: ["Si", "No"]  
    }
}, {collection : 'evolucion_pk'})

const Evolucion_pk = mongoose.model('Evolucion_pk', evolucion_pkSchema);

module.exports = Evolucion_pk;