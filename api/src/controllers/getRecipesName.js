/* 
GET | /recipes/name?="..."
Esta ruta debe obtener todas aquellas recetas que coincidan con el nombre recibido por query. (No es necesario que sea una coincidencia exacta).
Debe poder buscarla independientemente de mayúsculas o minúsculas.
Si no existe la receta, debe mostrar un mensaje adecuado.
Debe buscar tanto las de la API como las de la base de datos

*/
require('dotenv').config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Recipe } = require("../db");
const { Op } = require('sequelize');


const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`;


const getRecipesName = async (req, res) => {
    try {
        let name = req.query.name;
        let { data } = await axios(url);

        
        // FILTRO PARA RECETAS QUE CONTENGAN LA PALABRA NAME EN LA API 
        let recipesFromApi = data.results.filter(el =>
            el.title.toLowerCase().includes(name.toLowerCase()));


        // FILTRAMOS LOS MISMOS VALORES QUE TIENEN NUESTROS MODELS ID, NAME,DIETS, IMAGE, SUMMARY, HEALTHSCORE, STEPS
        recipesFromApi = recipesFromApi.map((el) => {
            return {
                id: el.id,
                name: el.title,
                image: el.image,
                diets: el.diets,
                summary: el.summary.replace(/<[^>]+>/g, ''),
                healthScore: el.healthScore,
                steps: el.analyzedInstructions[0]?.steps.map((elem) => {
                    return {
                        number: elem.number,
                        step: elem.step,
                        ingredients: elem.ingredients.map(obj => obj.name),
                    }
                }),
            }
        });

        // BUSCAR RECETAS QUE CONTENGAN LA PALABRA {NAME} EN LA BDD
        const recipesFromDB = await Recipe.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`, // Op.ilike no diferencia de mayus a minus %%busca la palabra que 
                },
            },
        });


        // PUSHEAMOS LO FILTRADO EN LA BDD A LO FILTRADO DE LA API  
        recipesFromDB.forEach(element => {
            recipesFromApi.push(element.dataValues);
        });


        // VERIFICAR SI SE ENCONTRÓ O NO LA RECETA 
        if (recipesFromApi.length) {
            return res.status(200).json(recipesFromApi);
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = getRecipesName;
