/* 📍 GET | /recipes/:idRecipe
Esta ruta obtiene el detalle de una receta específica.
Es decir que devuelve un objeto con la información pedida en el detalle de una receta.
La receta es recibida por parámetro (ID).
Tiene que incluir los datos de los tipos de dietas asociados a la receta.
Debe funcionar tanto para las recetas de la API como para las de la base de datos.
 */
require('dotenv').config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Recipe } = require("../db");
const { Op } = require('sequelize');


const getRecipesDetail = async (req, res) => {
    try {
        //recibimos el Id por query params 
        let id = req.params.id

        // verificamos el tipo de dato del ID (number o string )
        let source = isNaN(id) ? "bdd" : "api"
        const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=false`;

        // Si ID es number , buscamos en la API
        if (source == "api") {
            let { data } = await axios(url)
            const recipeApi = {
                id: data.id,
                name: data.title,
                image: data.image,
                summary: data.summary.replace(/<[^>]+>/g, ''), // remplazamos las etiquetas html del texto por " "
                diets: data.diets,
                healthScore: data.healthScore,
                steps:[ data.analyzedInstructions[0]?.steps.reduce((result, elem) => {
                    result[elem.number] = elem.step;
                    return result;
                }, {})]
            }
            return recipeApi ? res.status(200).json(recipeApi) : res.status(404).json("Not Found")
        }
     
        // SI NO ES TIPO NUMBER BUSCAMOS EN LAS RECETAS DE LA BDD 
        if (source == "bdd") {
            const recipeBdd = await Recipe.findAll({
                where: {
                    id: {
                        [Op.eq]: id // para realizar una comparación de igualdad en la columna id 
                    }
                }
            })
            return recipeBdd ? res.status(200).json(recipeBdd[0]) : res.status(404).json("Not Found")
        }

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = getRecipesDetail; 