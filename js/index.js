const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const infoPk = require("../modules/info-pk")

const app = express();
const port = 3000;
const user = 'usuarioPokemon';
const password = 'vv3wgGNbUmWrMVDj';
const dataBase = 'Pokemon'
const uri = `mongodb+srv://${user}:${password}@cluster0.4pammf6.mongodb.net/${dataBase}?retryWrites=true&w=majority`;

// Configurar el almacenamiento de archivos con multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

mongoose.connect(uri)
  .then(() => console.log("Base conectada"))
  .catch(error => console.error("Error al conectar la base:", error));

app.use(express.json()); // Agregar esta línea para manejar datos JSON
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/Pokemon', upload.single('image'), async (req, res) => {
  try {
    const { name, description, type, debilidades, evolution } = req.body;

    const newPokemon = new infoPk({
      name: name,
      description: description,
      type: type,
      debilidades: debilidades,
      evolution: evolution
    });

    if (req.file) {
      newPokemon.images = req.file.filename;
    }

    const createdPokemon = await newPokemon.save();

    console.log('Nuevo Pokémon agregado:', createdPokemon);
    res.status(201).json({ message: 'Pokémon registrado exitosamente', pokemon: createdPokemon });
  } catch (error) {
    console.error('Error al registrar el Pokémon:', error);
    res.status(500).json({ message: 'Error al registrar el Pokémon.', error: error.message });
  }
});

app.get('/Pokemon', async (req, res) => {
  try {
    const arrayInfoPk = await infoPk.find()
    res.json({
      arrayInfoPk
    });
  } catch (error) {
    console.log(error);
  }
});

// Ruta para actualizar información de un pokémon
app.put('/Pokemon/:id', (req, res) => {
  const pokemonId = req.params.id;
  const updatedInfo = req.body;

  res.json({ message: `Información del Pokémon con ID ${pokemonId} actualizada.` });
});





app.delete('/Pokemon/:id', (req, res) => {
  const pokemonId = req.params.id;

  res.json({ message: `Pokémon con ID ${pokemonId} eliminado.` });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}/Pokemon`);
});
