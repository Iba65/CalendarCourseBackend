const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/config");

// muestra todas las variables de entorno
//console.log(process.env);

//crear el servidor de express. Puede llamarse como queramos
const app = express();

// conectar base de datos
dbConnection();

// CORS
app.use(cors());

// directorio publico
// use()-> middelware -> una funcion que se ejecuta cuando alguien hacer una petición al servidor.
app.use(express.static("public"));

// lectura y parseo del body
app.use(express.json());

// rutas
//
app.use("/api/auth", require("./routes/auth"));
// Crear ruta de respuesta. Cuando se llame al servidor (localhost:4000 o localhost:4000/)
// se obtendrá la respuesta { OK: true }
/*app.get("/", (req, res) => {
  res.json({
    OK: true,
  });
});*/
app.use("/api/events", require("./routes/events"));

//const PORT = 4000;
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puesto ${process.env.PORT} `);
});
