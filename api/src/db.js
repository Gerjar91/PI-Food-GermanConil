require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, 
  DB_PASSWORD, 
  DB_HOST,
  DB_NAME,
  DB_DEPLOY
} = process.env;



/* // conectar sequelize a la base de datos *******************************
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false, // no sacar por consola la info 
  native: false, // 
});
 */
 // conectar sequelize a la base de datos *******************************
const sequelize = new Sequelize(DB_DEPLOY, {
  logging: false, // no sacar por consola la info 
  native: false, // 
});
 


const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);



// desestructuramos e importamos los modelos de sequelize 
const { Recipe,Diets } = sequelize.models;
// Aca vendrian las relaciones
Recipe.belongsToMany(Diets,{through:"recipe_diets"})
Diets.belongsToMany(Recipe,{through:"recipe_diets"})


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
