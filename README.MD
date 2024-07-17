# Express Validator

<p>Cuando se maneja información recibida desde el front vamos a querer validar que lo que nos llegue sea exactamente lo que estamos esperando. Para esto express tiene un paquete para validar la información que llegua al servidor a traves del <code style="color: cyan">body</code> o de las <code style="color: cyan">query</code>.</p>
<p>Pero para poder usarlo hay que instalar la libreria o el paquete: 
  <span style="background-color:white;  color:maroon; font-weight: 700;">&nbsp><i>npm i express-validator</i>&nbsp</span>
</p>

## <br />

<p><b>Para mas información sobre express-validator y como usar sus middlewares</b>:

### <https://express-validator.github.io/docs> (Documentacion)

### <https://express-validator.github.io/docs/api/check> (Como usar los middlewares)

##

<br/>
<p> Por otro lado para usar la libreria una vez instalada, como se entendera, hay que importarlo:

```javascript
const { check } = require("express-validator");
```

</p>
<br />

## Como implementar un middleware

<p>Se puede implementar de dos maneras:</p>
<ul>
  <li>
    Como una función:
    <p>Para ello en la ruta donde deseamos implementar la validación le pasariamos la funcion de validación como un parametro:</p>

```javascript
router.post("/new", funcValidar, crearUsuario);
```

   <p>Donde <code style="color: yellow">funcValidar</code> seria la función de validación y <code style="color: yellow">crearUsuario</code> seria la función del controlador.</p>
  </li>
  <li>
    Como una array de middlewares:
    <p>Este array tambien lo incluiriamos como segundo parametro. El numero de validaciones no tiene limites, podemos incluir cuantas queramos. Codigo ejemplo:</p>

```javascript
router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty(),
    check("email", "El email no tiene un formato correcto").isEmail(),
    check(
      "password",
      "El password debe de ser de minimo 6 caracteres"
    ).isLength({ min: 6 }),
  ],
  createAuth
);
```

   <p>Este metodo del <code style="color: yellow">express-validator</code> 'captura' el error que se produce cuando la validación especificada falla. Pero esto no seria util si no hacemos algo con ese error capturado</p>
   <p>Para ello tenemos que importar el metodo <code style="color: yellow">validationResult</code> en el controlador donde vamos a gestionar los errores:</p>

```javascript
const { validationResult } = require("express-validator");
```

  <p>Y en la función del controlador (en nuestro caso seria <code style="color: yellow">createAuth</code>) capturamos los errores y los gestionamos como deseemos. Como por ejemplo:</p>

```javascript
const myErrors = validationResult(req);
```

   <p>Donde <code style="color: cyan">myErrors</code> recibira un objeto en el cual, el elemento <code style="color: cyan">errors</code> contendra un array de objetos con los errores.</p>
  <p>Si pintaramos el contenido de <code style="color: cyan">errors</code>, veriamos algo como esto:</p>

```javascript
Result {
  formatter: [Function: formatter],
  errors: [
    {
      value: undefined,
      msg: 'El nombre es obligatorio',
      param: 'name',
      location: 'body'
    }
  ]
}
```

  <p>En caso de no producirse los errores, el elemento <code style="color: cyan">errors</code> vendrá como un array vacio. Sabiendo esto ya podemos hacer una validación comprobando si el array de errores esta vacio o con errores:</p>

```javascript
if (!errors.isEmpty()) {
  return res.status(400).json({
    ok: false,
    errors: errors.mapped(),
  });
}
```

  </li>
</ul>
<br />

## Middleware personalizados

<p>Una buena praxis es no gestionar los errores en la función del controlador, sino en un middleware personalizado, y asi, si hay errores no pasara a la función del controlador. Y por otro lado, la función del controlador quedara lo mas limpia posible.</p>
<p>
  Para ello vamos a hacer lo siguiente:
  <ul>
    <li>
      <p>Creamos una carpeta nueva en la raiz del proyecto con el nombre <code style="color: yellow">middlewares</code>. En ella cremos nuestro middleware personalizado, el cual podriamos llamarlo <code style="color: yellow">fields-validator.js</code>(aunque, el nombre va a eleccion personal). En el middleware ejemplo contendrá el siguiente código:</p>
    </li>

```javascript
const { response } = require("express");
const { validationResult } = require("express-validator");

const validateFields = (req, res = response, next) => {
  // manejo de errores
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }
  next();
};

module.exports = {
  validateFields,
};
```

  <li>
    <p>Ahora para usar nuestro middleware personalizado lo importamos en el fichero de rutas donde estamos haciendo las validaciones:</p>
  </li>

```javascript
const { validateFields } = require("../middlewares/fields-validator");
```

  <li>
    <p>Y ponemos el middleware personalizado como ultimo valor dentro del array de diddlewares o array de validaciones:</p>
  </li>

```javascript
router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty(),
    check("email", "El email no tiene un formato correcto").isEmail(),
    check(
      "password",
      "El password debe de ser de minimo 6 caracteres"
    ).isLength({ min: 6 }),
    validateFields,
  ],
  createAuth
);
```

  </ul>
</p>

### Entendiendo el codigo del Middleware personalizados

<p>Como podemos observar en los parametros que recibe la función del middleware personalizado, tenermos tres valores. ¿que significan y para que se usan?</p>
<ul>
  <li><b><code style="color: cyan">req</code></b>: Como ya hemos visto el <code style="color: cyan">req</code> contine los datos que son requeridos al usuario, los cuales pueden venir por el <code style="color: cyan">body</code> o por las <code style="color: cyan">query</code>. </li>
  <li><b><code style="color: cyan">res = response</code></b>: El <code style="color: cyan">res</code> tambien es conocido por su uso y contendra la respuesta. Pero en este caros importamos <code style="color: cyan">response</code> y lo pasamos como valor solo con la intención de obtener la ayuda del tipado al escribir el codigo. Podriamos dejarlo solo con el parametro <code style="color: cyan">res</code>. </li>
  <li><b><code style="color: cyan">next</code></b>: Y por ultimo el parametro <code style="color: cyan">next</code> se va a encargar de llamar a la siguiente linea de codigo despues de ejecutarse la anterior. En el caso ejemplo que estamos tratando, primero se ejecutaria la linea del <code style="color: cyan">check</code> del <code style="color: yellow">name</code>, y next pasaria a la siguiente, y asi hasta llegar a la funcion personalizada del middleware. </li>

  </ul>
<br /><br />

# Creacion de la base de datos

### <https://www.restapitutorial.com/httpstatuscodes.html> (Codigo de estado en peticiones HTTP)

### <https://www.mongodb.com/cloud/atlas/efficiency?utm_source=google&utm_campaign=gs_americas_canada_search_brand_atlas_desktop&utm_term=mongo%20atlas&utm_medium=cpc_paid_search&utm_ad=e&gclid=Cj0KCQjwiYL3BRDVARIsAF9E4GfQWQYG_pbTlJA5eixJKM75IaFYqk4nUBlKe0iXkKn4kXc1HZmKSikaAtKzEALw_wcB> (Mongodb web)

### <https://mongoosejs.com/> (Mongoose web)

<ul>
  <li>
    <p>En lapagina oficial de mongodb, indicada arriba, seleccionamos "prueba gratuita" o "Try free", dependiendo del lenguage con la que abramos la pagina:</p>
    <p style = 'text-align:center;'>
      <img src="./docum/01-inicialMongoAtlas.jpg" alt="JuveYell" width="600px">
    </p>
  </li>
  <li>
    <p>Rellenamos toda la inforamación solicitada para crear una cuenta:</p>
    <p style = 'text-align:center;'>
      <img src="./docum/01a-MongoDB Atlas _ MongoDB.png" alt="JuveYell" width="600px">
    </p>
  </li>
  <li>
    <p>Seguidamente verificamos el email de la cuenta en nuestro correo electronico:</p>
    <p style = 'text-align:center;'>
      <img src="./docum/01b-verifyEmail.jpg" alt="JuveYell" width="600px">
    </p>
  </li>
  <li>
    <p>Rellenamos el formulario que nos solicita para saber para que vamos a utilizar mongodb_</p>
    <p style = 'text-align:center;'>
      <img src="./docum/02-cuestionario.jpg" alt="JuveYell" width="600px">
    </p>
  </li>
  <li>
    <p>Y una vez que estamos registrados y entramos en la cuenta veremos una pantalla igual o simililar a esta:</p>
    <p style = 'text-align:center;'>
      <img src="./docum/03-CreateDB.jpg" alt="JuveYell" width="600px">
    </p>
    <p>- En el grupo DESPLIEGUE seleccionamos la opción Base de datos.</p>
    <p>- Y seguidamente pinchamos en la opción construir una base de datos.</p>
  </li>
  <li>
    <p>Seguidamente nos va a sugerir que seleccionemos la opción de configuración de nuestra base de datos. De momento lo dejamos sin seleccionar y indicamos que lo haremos mas tarde:</p>
    <p style = 'text-align:center;'>
      <img src="./docum/04-jumpage.jpg" alt="JuveYell" width="600px">
    </p>
  </li>
  <li>
    <p>Cuando el proceso de creación de la base de datos termine, podremos conectarnos a la base de datos recien creada en el botón connect:</p>
    <p style = 'text-align:center;'>
      <img src="./docum/05-inicialDbCreate.jpg" alt="JuveYell" width="600px">
    </p>
  </li>
  <li>
    <p>Seguidamente nos va a pedir que creemos un usuario para la base de datos, o un administrador de la base de datos, pero de momento este paso no lo hacemos, pues lo haremos mas adelante:</p>
    <p style = 'text-align:center;'>
      <img src="./docum/05a-cancelProcess.jpg" alt="JuveYell" width="600px">
    </p>
  </li>
  <li>
    <p>Ahora si, ahora escogemos la configuración de la base de datos:</p>
    <p style = 'text-align:center;'>
      <img src="./docum/06-creaciondbform.jpg" alt="JuveYell" width="600px">
    </p>
    <p>- Opción gratuita.</p>
    <p>- En "name" especificamos el nombre de nuestra base de datos, que no sea complicado.</p>
    <p>- Y dejamos la configuración sugerida, ya que la configuración que nos ofrece suele ser la mas cercana a nosotros y la mejor opción:</p>
  </li>
  <li>
    <p>Seguidamente ahora creamos el usuario o el administrador de la base de datos:</p>
    <p style = 'text-align:center;'>
      <img src="./docum/07-cearUserGenerico.jpg" alt="JuveYell" width="600px">
    </p>
  </li>
  <li>
    <p>Vamos a cambiar el modo de conexión ya que utilizaremos la herramienta de mongo, mongodb compas, que nos facilitara el manejo de la base de datos:</p>
    <p style = 'text-align:center;'>
      <img src="./docum/08-cearUserGenericoOk.jpg" alt="JuveYell" width="600px">
    </p>
  </li>
  <li>
    <p>Seleccionamos como indicamos mongodb compas:</p>
    <p style = 'text-align:center;'>
      <img src="./docum/09-metodoConexion.jpg" alt="JuveYell" width="600px">
    </p>
  </li>
  <li>
    <p>Dependiendo de si no lo tenemos instalado o si, elegimos la opcion. De no tenerlo instalado, elegimos el instalador de windows msi y lo instalamos: </p>
    <p style = 'text-align:center;'>
      <img src="./docum/10-metodoConexionCompas.jpg" alt="JuveYell" width="600px">
    </p>
  </li>
  <li>
    <p>Una vez instalado, lo abrimos para establecer la conexión de la base de datos:</p>
    <p style = 'text-align:center;'>
      <img src="./docum/11-MongoDbCompas.jpg" alt="JuveYell" width="600px">
    </p>
  </li>
  <li>
    <p>Indicamos que queremos editar la conexión de la base de datos. Y ponemos los datos de conexión de nuestra base de datos. Esta información nos la proporciona mongodb cuando pulsamos el boton connect:</p>
    <p style = 'text-align:center;'>
      <img src="./docum/12-conexionCompas.jpg" alt="JuveYell" width="600px">
    </p>
  </li>
  <li>
    <p>Creamos nuestro usuario para la conexión de la base de datos.</p>
    <p style = 'text-align:center;'>
      <img src="./docum/13-crearusuarioinicial.jpg" alt="JuveYell" width="600px">
    </p>
  </li>
  <li>
    <p>Establecemos la clave o generamos una segura:</p>
    <p style = 'text-align:center;'>
      <img src="./docum/14-crearusuarioinicialForm1.jpg" alt="JuveYell" width="600px">
    </p>
  </li>
  <li>
    <p>Indicamos que queremos la base de datos de lectura y escritura:</p>
    <p style = 'text-align:center;'>
      <img src="./docum/15-crearusuarioinicialForm2.jpg" alt="JuveYell" width="600px">
    </p>
  </li>
  <li>
    <p>Y creamos el usuario:</p>
    <p style = 'text-align:center;'>
      <img src="./docum/16-crearusuarioinicialForm2.jpg" alt="JuveYell" width="600px">
    </p>
  </li>
  <li>
    <p>En mongo atlas pulsamos en conecctar y ya deberiasmos ver la información de la base de datos:</p>
    <p style = 'text-align:center;'>
      <img src="./docum/17-probarConexion.jpg" alt="JuveYell" width="600px">
    </p>
  </li>
  <li>
    <p>Info de la base de datos:</p>
    <p style = 'text-align:center;'>
      <img src="./docum/18-ConexionOk.jpg" alt="JuveYell" width="600px">
    </p>
  </li>
  <li>
    <p>Lo guardamos en favoritos para proximas conexiones:</p>
    <p style = 'text-align:center;'>
      <img src="./docum/19-guardarconexionFavoritos.jpg" alt="JuveYell" width="600px">
    </p>
  </li>
</ul>

# Configuración del codigo.

<p>Vamos a instalar el codigo tomado de la pagina de <a href="https://mongoosejs.com/">Mongoose </a> donde usaremos la configuración que se nos aconseja:</p>
<div>
<p style = 'text-align:center;'>
<img src="./docum/101mongooseWeb.jpg" alt="JuveYell" width="600px">
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
// use()-> middleware -> una funcion que se ejecuta cuando alguien hacer una petición al servidor.
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

</li>
<li>
<p>
  Ahora tenemos que importar el schema creado, con el nombre con el que lo exportamos:

```javascript
const User = require("../models/UserModel");
```

</p>
</li>
<li>
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

- Como diseñar un schema:
  <https://apuntes.de/nodejs-desarrollo-web/esquemas-en-mongoose/#gsc.tab=0> (¿Que es y para que se utiliza?)

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

# Revalidar un JWT

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
    const payload = jw.verify(token, process.env.SECRET_JWT_SEED);
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
