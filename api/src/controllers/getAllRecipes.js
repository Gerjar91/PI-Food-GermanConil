
require('dotenv').config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Recipe, Diets } = require("../db");
const  fs  = require("fs");
const path = require("path")


const getAllRecipes = async (req, res) => {

    try {
        const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`;

        // extraemos los primero 100 recipes de la api 
         let { data } = await axios(url)
 
        // buscamos todas las recetas de la BD e inclumios su relacion con el model Diets
        const dataBD = await Recipe.findAll({
            include: [{
                model: Diets,
                attributes: ['name'],
            }]
        });

        // mapaeamos la data en un array de objetos para filtrar toda la info que envia sequelize
        const allRecipesBD = dataBD.map((recipe) => {
            return {
                id: recipe.id,
                title: recipe.name,
                summary: recipe.summary,
                image: recipe.image,
                healthScore: recipe.hs,
                steps: recipe.steps,
                diets: recipe.diets.map((diet) => diet.name)
            };
        });


        // unificamos los reusltados de la BD y de la API
        data.results.unshift(...allRecipesBD) // agregamos a la data esparciendo los objetos del array 


        //mapeamos todos los valores que queremos enviar al front 
        let allRecipes = data.results.map((el) => {
            return {
                id: el.id,
                name: el.title,
                image: el.image,
                diets: el.diets,
                hs: el.healthScore
            }
        })
        return res.status(200).json(allRecipes);
    } catch (error) {
        (error => res.status(400).send(error.message));
    }


}
module.exports = getAllRecipes; 









/*       //esto es solo para leer el archivo JSON 
        const filePath = path.join(__dirname, '../../data.json');
        const rawData = fs.readFileSync(filePath);
        const data = JSON.parse(rawData);  
 */
