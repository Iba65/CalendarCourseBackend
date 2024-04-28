# Creacion de la base de datos

### <https://www.restapitutorial.com/httpstatuscodes.html> (Codigo de estado en peticiones HTTP)

### <https://www.mongodb.com/cloud/atlas/efficiency?utm_source=google&utm_campaign=gs_americas_canada_search_brand_atlas_desktop&utm_term=mongo%20atlas&utm_medium=cpc_paid_search&utm_ad=e&gclid=Cj0KCQjwiYL3BRDVARIsAF9E4GfQWQYG_pbTlJA5eixJKM75IaFYqk4nUBlKe0iXkKn4kXc1HZmKSikaAtKzEALw_wcB> (Mongodb web)

### <https://mongoosejs.com/> (Mongoose web)

<ul>
  <li>
    <p style = 'text-align:center;'>
      <img src="./docum/01-inicialMongoAtlas.jpg" alt="JuveYell" width="300px">
    </p>
  </li>
  <li>
    <p style = 'text-align:center;'>
      <img src="./docum/01a-MongoDB Atlas _ MongoDB.png" alt="JuveYell" width="300px">
    </p>
  </li>
  <li>
    <p style = 'text-align:center;'>
      <img src="./docum/01b-verifyEmail.jpg" alt="JuveYell" width="300px">
    </p>
  </li>
  <li>
    <p style = 'text-align:center;'>
      <img src="./docum/02-cuestionario.jpg" alt="JuveYell" width="300px">
    </p>
  </li>
  <li>
    <p style = 'text-align:center;'>
      <img src="./docum/03-CreateDB.jpg" alt="JuveYell" width="300px">
    </p>
  </li>
  <li>
    <p style = 'text-align:center;'>
      <img src="./docum/04-jumpage.jpg" alt="JuveYell" width="300px">
    </p>
  </li>
  <li>
    <p style = 'text-align:center;'>
      <img src="./docum/05-inicialDbCreate.jpg" alt="JuveYell" width="300px">
    </p>
  </li>
  <li>
    <p style = 'text-align:center;'>
      <img src="./docum/05a-cancelProcess.jpg" alt="JuveYell" width="300px">
    </p>
  </li>
  <li>
    <p style = 'text-align:center;'>
      <img src="./docum/06-creaciondbform.jpg" alt="JuveYell" width="300px">
    </p>
  </li>
  <li>
    <p style = 'text-align:center;'>
      <img src="./docum/07-cearUserGenerico.jpg" alt="JuveYell" width="300px">
    </p>
  </li>
  <li>
    <p style = 'text-align:center;'>
      <img src="./docum/08-cearUserGenericoOk.jpg" alt="JuveYell" width="300px">
    </p>
  </li>
  <li>
    <p style = 'text-align:center;'>
      <img src="./docum/09-metodoConexion.jpg" alt="JuveYell" width="300px">
    </p>
  </li>
  <li>
    <p style = 'text-align:center;'>
      <img src="./docum/10-metodoConexionCompas.jpg" alt="JuveYell" width="300px">
    </p>
  </li>
  <li>
    <p style = 'text-align:center;'>
      <img src="./docum/11-MongoDbCompas.jpg" alt="JuveYell" width="300px">
    </p>
  </li>
  <li>
    <p style = 'text-align:center;'>
      <img src="./docum/12-conexionCompas.jpg" alt="JuveYell" width="300px">
    </p>
  </li>
  <li>
    <p style = 'text-align:center;'>
      <img src="./docum/13-crearusuarioinicial.jpg" alt="JuveYell" width="300px">
    </p>
  </li>
  <li>
    <p style = 'text-align:center;'>
      <img src="./docum/14-crearusuarioinicialForm1.jpg" alt="JuveYell" width="300px">
    </p>
  </li>
  <li>
    <p style = 'text-align:center;'>
      <img src="./docum/15-crearusuarioinicialForm2.jpg" alt="JuveYell" width="300px">
    </p>
  </li>
  <li>
    <p style = 'text-align:center;'>
      <img src="./docum/16-crearusuarioinicialForm2.jpg" alt="JuveYell" width="300px">
    </p>
  </li>
  <li>
    <p style = 'text-align:center;'>
      <img src="./docum/17-probarConexion.jpg" alt="JuveYell" width="300px">
    </p>
  </li>
  <li>
    <p style = 'text-align:center;'>
      <img src="./docum/18-ConexionOk.jpg" alt="JuveYell" width="300px">
    </p>
  </li>
  <li>
    <p style = 'text-align:center;'>
      <img src="./docum/19-guardarconexionFavoritos.jpg" alt="JuveYell" width="300px">
    </p>
  </li>
</ul>

# Configuración del codigo.

<p>Vamos a instalar el codigo tomado de la pagina de <a href="https://mongoosejs.com/">Mongoose </a> donde usaremos la configuración que se nos aconseja:</p>
<div>
<p style = 'text-align:center;'>
<img src="./docum/101mongooseWeb.jpg" alt="JuveYell" width="300px">
</p>
</div>
<ul>
  <li><p>Primero intalaremos la libreria en nuestro proyecto: 
  <span style="background-color:white;  color:maroon; font-weight: 700;">&nbsp><i>npm i mongoose</i>&nbsp</span></p></li>
  <li><p>
  Segundo creamos una nueva carpeta en el directorio raiz del proyecto llamado <code style="color: yellow">database</code>, y en la carpeta creada un archivo llamado <code style="color: yellow">config.js</code>. <br/><br/> En dicho archivo creado escribimos el siguiente codigo:
  </p></li>

```javascript
const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNNT);
    console.log("DB Online");
  } catch (error) {
    console.log(error);
    throw new Error("Error al inicializar base de datos");
  }
};

module.exports = {
  dbConnection,
};
```

  <li><p>
  Crear una nueva variable en el archivo <code style="color: yellow">.env</code> que seria:
  <span style="background-color:white;  color:maroon; font-weight: 700;">&nbsp><i>DB_CNNT=mongodb+srv://user:password@calendardb.valor.mongodb.net/bd_name</i>&nbsp</span>. Esta es la url de conexion que hemos pegado en mongoDB compas. los valores <strong>user</strong>, <strong>password</strong>, <strong>valor</strong> y <strong>bd_name</strong> serán diferentes segun cada desarrollo y cada base de datos.
  </p></li>
  <li><p>
  Por ultimo actualizamos nuestro <code style="color: yellow">index.js</code> principal del proyecto, el que lo lanza, quedando de la siguiente forma:
  </p></li>

```javascript
const express = require("express");
require("dotenv").config();
const { dbConnection } = require("./database/config");

//crear el servidor de express. Puede llamarse como queramos
const app = express();

// conectar base de datos
dbConnection();

// directorio publico
// use()-> middelware -> una funcion que se ejecuta cuando alguien hacer una petición al servidor.
app.use(express.static("public"));

// lectura y parseo del body
app.use(express.json());

// rutas
//
app.use("/api/auth", require("./routes/auth"));

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puesto ${process.env.PORT} `);
});
```

- <i>Ten en cuenta que la variable app pude tener otro nombre creado por el desarrollador.</i>
</ul>

# Creando la gestion de usuarios:

<ul>
  <li> Antes de guardar el nuevo usuario en la base de datos, vamos a relizar una comprobación para ver si el usuario ya existe, a traves de la comprobación del email. Y como lo que vamos a realizar es una llamada asincrona a la base de datos de Mongodb modificaremos la funcion de nuestros controladores <code style="color: yellow">createAuth</code> haciendola asincrona.
  </li>
  <br/>
  <li>
    Pero para poder incluir en nuestra función la grabación del usuario, necesitamos crear un modelo. Para ello crearemos la carpeta <code style="color: yellow">models</code>, y en la carpeta creada un archivo llamado <code style="color: yellow">UserModel.js</code>. En dicho archivo escribiremos el siguiente codigo:

```javascript
const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

module.exports = model("User", UserSchema);
```

<p>un <code style="color: cyan">Schema</code> no es mas que la definición de un objeto que tendra la estructura de cada uno de los registros de la tabla de la base de datos. Una base de datos puede tener muchas tablas, la cual tendra pares de <code style="color: cyan">clave-valor</code> que se definen en el <code style="color: cyan">Schema</code>. Asi al grabar el registro se creara un objeto con los valores definidos en el <code style="color: cyan">Schema</code>.</p>
<p>Seguidamente definimos el codigo para la grabación dentro de el controlador <code style="color: yellow">createAuth</code> quedando el codigo de la siguiente manera:

```javascript
const createAuth = async (req, res = response) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "El correo introducido ya pertenece a otro usuario.",
      });
    }

    user = new User(req.body);

    await user.save();

    res.status(201).json({
      user: {
        ok: true,
        uid: user.id,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error al crear el usuario. Hable con el administrador de la base de datos, o intentelo de nuevo mas tarde.",
    });
  }
};
```

  </li>

</ul>

# Encriptando la contraseña:

  <p>Cualquier dato sensible debe ir protegido para que si alguien no deseado accede a la base de datos, lo que vea no se entendible por esa parsona. Para ello usarmos una funcion de encryptación.</p>
  
<ul>
  <li>
    Primero instalaremos la libreria de encryptacion: 
    <span style="background-color:white;  color:maroon; font-weight: 700;">&nbsp><i>npm i bcryptjs</i>&nbsp</span>
  </li>
  <li>
    Seguidamente la importamos en el archivo controlador <code style="color: yellow">auth.js</code>:

```javascript
const bcrypt = require("bcryptjs");
```

  <br/>
    Para encriptar tenemos que generar un <code style="color: cyan">salt</code>, que no es mas que un numero o un pedazo de información aleatoria que se usara para la encriptación de una sola via.
  <br />
    Seguidamente realizamos el encriptado de lo que deseemos, con la función de encriptación, pasandole el salt obtenido. Este codigo lo incluiriamos en el controllador de creación <code style="color: yellow">createAuth</code> antes de la grabación, con el siguiente codigo:

```javascript
const salt = bcrypt.genSaltSync();
user.password = bcrypt.hashSync(password, salt);
```

  </li>

</ul>

# Generando un JWT

### <https://jwt.io/> (JWT web)

<p>
  Un JWT es un json Web Token, y esto es un string alfanumerico largo que nos permite manejar el estado de la sesión del usuario de forma pasiva. Este token se valida, se verifica y si no a expirado, se ejecuta lo que el usuario solicito.
</p>

<div>
<p style = 'text-align:center;'>
<img src="./docum/JWTpartes.jpg" alt="JuveYell" width="300px">
</p>
</div>

<p>
  Los JWT tienen tres partes importante:
  <ol>
    <li>
    <code style="color: yellow">Header:</code> Dice que tipo de algoritmo es usado para la encriptacion y el tipo de token.
    </li>
    <li>
    <code style="color: yellow">Payload:</code> La información que se graba dentro del token. Es publico, por lo tanto no tiene que ser nada 'sensible'.
    </li>
    <li>
    <code style="color: yellow">Verify Signature:</code> La firma del token. Hay que mandar una palabra secreta que permite el poder firmarlo para que se valide el token. Y añadir una fecha de expiración.
    </li>

  </ol>
</p>

<p>
  En nuestro proyecto crearemos el JWT en dos sitios dentro de los controladores. Cuando se crea el usuario y cuando se loguea. 
</p>

<ul>
  <li>
    Primero instalaremos la libreria para la creación del JWT: 
    <span style="background-color:white;  color:maroon; font-weight: 700;">&nbsp><i>npm i jsonwebtoken</i>&nbsp</span>
  </li>
  <li>
    Seguidamente creamos una carpeta nueva llamada <code style="color: yellow">helpers</code>. La tipica carpeta para colocar las funciones de soporte para una aplicacion. y en ella un archivo llamado <code style="color: yellow">jwt.js</code>.
    <br/>
  </li>
  <li>
    Necesitamos tambien crear una nueva variable de entorno para guardar una palabra 'secreta' que se utilizará para la firma del token:
    <span style="background-color:white;  color:maroon; font-weight: 700;">&nbsp><i>SECRET_JWT_SEED=PaLaBra_SecRETA</i>&nbsp</span>.
  </li>

  <li>
    Por ultimo, en el archivo <code style="color: yellow">jwt.js</code> escribiremos el siguinte codigo:

```javascript
const jwt = require("jsonwebtoken");

const generateJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          reject(`No se puedo generar el token. Error: ${err}`);
        }
        resolve(token);
      }
    );
  });
};

module.exports = {
  generateJWT,
};
```

  </li>
  <li>
    Ahora utilicemos el codigo en nuestro controlador <code style="color: yellow">auth.js</code>.
    <ol>
      <li>
        Importamos la funcion que genera el JWT:
      </li>

```javascript
const { generateJWT } = require("../helpers/jwt");
```

  <li>
    La usamos en las dos partes definidas para usarlos. En la creacion del usuario despues de la grabación exitosa. Y al loguearnos antes de mandar la respuest, depues de loguearnos exitosamente.

```javascript
const token = await generateJWT(user.id, user.name);
```

y lo incluimos en la respuesta:

```javascript
res.status(201).json({
  user: {
    ok: true,
    uid: user.id,
    name: user.name,
    token,
  },
});
```

  </li>
  </ol>
  </li>
</ul>

# Revlidar un JWT

<p>
  Un JWT esta creado con la intención de limitar el tiempo de uso de una aplicación para evitar el abuso y el mal uso de la misma. Es decir, no solo se comprueba si el usuario logueado es el correcto, sino que al limite de un tiempo no pueda seguir usando la app. Para poder seguir utilizandola hace falta revalidar el token, es decir, volver a generar un token y pasar una nueva validación.
</p>
<ul>

<li>
  Para ello crearemos un nuevo <code style="color: cyan">middleware</code> en la carpeta <code style="color: yellow">middlewares</code> llamado <code style="color: yellow">validar-jwt.js</code>. En este archivo escribiremos el siguiente codigo:
</li>

```javascript
const { response } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req, res = response, next) => {
  // pasar el token en las headers: x-token
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "Fallo en autenticación del usuario.",
    });
  }
  try {
    // se obtiene el payload que se paso en la creacion del JWT
    const payload = jw.varify(token, process.env.SECRET_JWT_SEED);
    req.uid = payload.uid;
    req.name = payload.name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no valido.",
    });
  }

  next();
};

module.exports = {
  validarJWT,
};
```

  <li>
  Luego importamos el <code style="color: cyan">middlewere</code> en fichero de rutas <code style="color: yellow">auth.js</code>

```javascript
const { validarJWT } = require("../middlewares/validar-jwt");
```

Y lo incluimos en los parametros de la ruta para renovar el token:

  </li>

```javascript
router.get("/renew", validarJWT, revalToken);
```

  <li>
  Por último actualizamos el código de nuestra funcion  <code style="color: cyan">revalToken</code> del fichero de controladores <code style="color: yellow">auth.js</code>, quedando asi:
  </li>

```javascript
const revalToken = async (req, res = response) => {
  const { uid, name } = req;

  // generar un nuevo token
  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    token,
  });
};
```

</ul>

# Configurando el CORS

### <https://www.npmjs.com/package/cors> (npm - cors) -- <https://enable-cors.org/>

<p>
El cors es un recurso que nos permite controlar que dominio, esquema o puerto con un origen distinto al nuestro puede acceder a los recursos. O verificar al servidor para permitir la solicitud HTTP. En esta comprobación previa, el navegador envía cabeceras que indican el método HTTP y las cabeceras que se utilizarán en la solicitud real.
</p>
<div>
<p style = 'text-align:center;'>
<img src="./docum/corsEjemplo.jpg" alt="JuveYell" width="300px">
</p>

<ul>
  <li>
    Instalamos la libreria en primer lugar:
    <span style="background-color:white;  color:maroon; font-weight: 700;">&nbsp><i>npm i cors</i>&nbsp</span>
  </li>

  <li>
    importamos el cors en el archivo prinpial <code style="color: yellow">index.js</code>:
  </li>

```javascript
const cors = require("cors");
```

  <li>
    Incluimos el cors en el archivo prinpial <code style="color: yellow">index.js</code> debajo de la funcion de conexion de la base de datos:
  </li>

```javascript
app.use(cors());
```

</ul>
</div>
