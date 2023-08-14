// const express = require('express');
// const mongoose = require('mongoose');
// const Evolucion_pk = require("../modules/evolucion_pk");
// const Nombre_pk = require("../modules/nombre_pk");
// const Tipo_pk = require("../modules/tipo_pk");
// const Description_pk = require("../modules/descripcion_pk");
// const Debilidades_pk = require("../modules/debilidades_pk");

// const app = express();
// const port = 3000;
// const user = 'usuarioPokemon';
// const password = 'vv3wgGNbUmWrMVDj';
// const dataBase = 'Pokemon'
// const uri = `mongodb+srv://${user}:${password}@cluster0.4pammf6.mongodb.net/${dataBase}?retryWrites=true&w=majority`;


// mongoose.connect(uri)
//   .then(() => console.log("Base conectada"))
//   .catch(error => console.error("Error al conectar la base:", error));

//   const bodyParser = require('body-parser');
//   app.use(bodyParser.urlencoded({ extended: true })); 
//   app.use(bodyParser.json());

// let pokemonList = [];

// app.use(express.json()); // Agregar esta línea para manejar datos JSON

// app.post('/Pokemon', async (req, res) => {
//   try {
//     const newPokemon = req.body;
//     const createdPokemon = await Pokemon.create(newPokemon);
//     res.json({ message: 'Pokémon añadido exitosamente.', pokemon: createdPokemon });
//   } catch (error) {
//     res.status(500).json({ message: 'Error al añadir el Pokémon.', error: error.message });
//   }
// });


// app.get('/Pokemon', async  (req, res) => {
//   try {
//     const arrayNombreDB = await Nombre_pk.find()
//     console.log(arrayNombreDB); 
//     const arrayEvolucionDB = await Evolucion_pk.find()
//     console.log(arrayEvolucionDB); 
//     const arrayDescriptionDB = await Description_pk.find()
//     console.log(arrayDescriptionDB); 
//     const arrayTipoDB = await Tipo_pk.find()
//     console.log(arrayTipoDB);
//     const arrayDebilidaesDB = await Debilidades_pk.find()
//     console.log(arrayDebilidaesDB);

//   } catch (error) {
//   console.log(error);
//   }

// });

// // Ruta para actualizar información de un pokémon
// app.put('/Pokemon/:id', (req, res) => {
//   const pokemonId = req.params.id;
//   const updatedInfo = req.body;

//   res.json({ message: `Información del Pokémon con ID ${pokemonId} actualizada.` });
// });

// app.delete('/Pokemon/:id', (req, res) => {
//   const pokemonId = req.params.id;

//   res.json({ message: `Pokémon con ID ${pokemonId} eliminado.` });
// });

// app.listen(port, () => {
//   console.log(`http://localhost:${port}/Pokemon`);
// });

const app = require("./app.js")
import connectToDatabase from './database.js'; 
const open = require("open")
import { PORT } from './config.js'; 

async function startServer() {
  try {
    await connectToDatabase(); // Conecta a la base de datos
    app.listen(PORT, () => {
      console.log('Server is running on port:', PORT);
      console.log('Environment:', process.env.NODE_ENV);
      
      // Abre el formulario en el navegador automáticamente
      open(`http://localhost:${PORT}/add`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
}

startServer();
