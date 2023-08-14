const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const nombre_pk = require("../modules/nombre_pk"); // Importa tus modelos y otros archivos necesarios
const debilidades_pk = require("../modules/debilidades_pk");
const descripcion_pk = require("../modules/descripcion_pk");
const evolucion_pk = require("../modules/evolucion_pk");
const tipo_pk = require("../modules/tipo_pk");


const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de Multer para manejar la carga de imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images"); // Cambia la ruta según tu estructura de carpetas
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Configuración de Mongoose y otros middlewares
mongoose.connect("mongodb://localhost:27017/Pokemon", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Ruta para mostrar el formulario
app.get("/add", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "add.html"));
});

app.set("port", PORT);

app.post("/add", upload.single("image"), async (req, res) => {
  const { name, description, types, weaknesses, evolution } = req.body;
  const imagePath = req.file ? req.file.filename : "";

  try {
    // Crea un nuevo Pokémon en la base de datos
    const newPokemon = new nombre_pk({
      nombre: name,
      imagen: imagePath,
    });

    // Crea registros en los modelos relacionados
    const newDescription = new descripcion_pk({
      descripcion: description,
    });

    const newTypes = new tipo_pk({
      tipo: types, // Debes pasar un array con los tipos seleccionados
    });

    const newWeaknesses = new debilidades_pk({
      debilidad: weaknesses, // Debes pasar un array con las debilidades seleccionadas
    });

    const newEvolution = new evolucion_pk({
      evolucion: evolution,
    });

    // Guarda los registros en la base de datos
    await newPokemon.save();
    await newDescription.save();
    await newTypes.save();
    await newWeaknesses.save();
    await newEvolution.save();

    res.redirect("/pokedex"); // Redirecciona a la página de la Pokédex u otra
  } catch (error) {
    console.error(error);
    res.redirect("/add"); // En caso de error, redirecciona de nuevo al formulario
  }
});


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/Pokemon`);
});
