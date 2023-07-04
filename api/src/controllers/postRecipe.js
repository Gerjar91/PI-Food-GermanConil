
/* 
POST | /recipes
Esta ruta recibirá todos los datos necesarios para crear una nueva receta y relacionarla con los tipos de dieta solicitados.
Toda la información debe ser recibida por body.
Debe crear la receta en la base de datos, y esta debe estar relacionada con los tipos de dieta indicados (al menos uno).
 */

require('dotenv').config();
const axios = require("axios");
const { API_KEY } = process.env;

const postRecipe = (req, res) => {

    try {
        let recipe = req.body

    } catch (error) {

    }



}
module.exports = postRecipe


