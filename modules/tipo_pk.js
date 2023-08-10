const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const tipo_pkSchema = new Schema ({
    tipo:{
        enum: ['planta', 'fuego', 'agua', 'tierra', 'psiquico', 'bicho', 'dragon', 'acero', 
        'veneno', 'electrico', 'fantasma', 'hada', 'normal', 'hielo', 'lucha', 'volador', 'roca', 'siniestro']
    }
}, {collection : 'tipo_pk'})

const Tipo_pk = mongoose.model('Tipo_pk', tipo_pkSchema);

module.exports = Tipo_pk;