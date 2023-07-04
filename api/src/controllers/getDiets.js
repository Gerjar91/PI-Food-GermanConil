/* 
📍 GET | /diets
Obtiene un arreglo con todos los tipos de dietas existentes.
En una primera instancia, cuando no exista ninguna dieta, deberás precargar la base de datos con las dietas de la documentación.
Estas deben ser obtenidas de la API (se evaluará que no haya hardcodeo). Luego de obtenerlas de la API, deben ser guardadas en la base de datos para su posterior consumo desde allí.
 */

require('dotenv').config();
const axios = require("axios");
const { API_KEY } = process.env;


const alldiets = [
    "vegetarian",
    "vegan",
    "gluten free"
];

const getDiets = async (req, res) => {

    try {
        const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`;
        let {data} = await axios(url)
        data.results.forEach(recipe => {
            recipe.diets.forEach(dietsName=>{
                if(!alldiets.includes(dietsName)) alldiets.push(dietsName)
            })
        })
        return res.status(200).json(alldiets)
        ;
    } catch (error) {
        (error => res.status(400).send(error.message))
    }
}
module.exports = getDiets; 

/* 
DIETAS DE LA PAGINA 

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
