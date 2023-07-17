/* 
📍 GET | /diets
Obtiene un arreglo con todos los tipos de dietas existentes.
En una primera instancia, cuando no exista ninguna dieta, deberás precargar la base de datos con las dietas de la documentación.
Estas deben ser obtenidas de la API (se evaluará que no haya hardcodeo). Luego de obtenerlas de la API, deben ser guardadas en la base de datos para su posterior consumo desde allí.
 */

require('dotenv').config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Diets } = require("../db");


// diets que se encuantran aparte de item diets en la API 
const alldiets = [
    "vegetarian",
    "vegan",
    "gluten free"
];

const getDiets = async (req, res) => {
    try {
        // verificamos si la BDD está vacía  (count verifica la cantidad de elementos en el modelo)
        const count = await Diets.count();

        if (count === 0) {
            // extraemos las dietas de la API y las cargamos en el array 
            const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`;
            let { data } = await axios(url);
            data.results.forEach(recipe => {
                recipe.diets.forEach(dietsName => {
                    if (!alldiets.includes(dietsName)) alldiets.push(dietsName);
                });
            });
            // cargamos los valores del array en la BD en la BDD 
             {
                const response = await Diets.bulkCreate(alldiets.map((item) => {
                    return { name: item };
                }));
                return res.status(200).json(response);
            }
        }else return res.status(400).json("La BDD ya esta cargada")

    } catch (error) {
        (error => res.status(400).send(error.message));
    }
};

module.exports = getDiets;

/* 
DIETAS DE LA PÁGINA 

Gluten Free
Ketogenic
Vegetarian
Lacto-Vegetarian
Ovo-Vegetarian
Vegan
Pescetarian
Paleo
Primal
Low FODMAP
Whole30
*/
