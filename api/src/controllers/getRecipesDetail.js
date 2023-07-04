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


const getRecipesDetail = async (req, res) => {
    try {
        let id = req.params.id
        const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=false`;

        let { data } = await axios(url)
        if (data) {
            const recipe = {
                id: data.id,
                name: data.title,
                image: data.image,
                summary: data.summary,
                diets: data.diets,
                healthScore: data.healthScore,
                steps: data.analyzedInstructions[0].steps.map((elem) => {
                    return {
                        number: elem.number,
                        step: elem.step,
                        ingredients:elem.ingredients.map(obj => obj.name,    
                        )
                    }
                }

                )
            }
            return res.status(200).json(recipe)
        } else {
            return res.status(404).send("recurso no encontrado")
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = getRecipesDetail; 