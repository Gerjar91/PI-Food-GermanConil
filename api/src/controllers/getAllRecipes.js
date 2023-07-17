
require('dotenv').config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Recipe, Diets } = require("../db");
const fs = require('fs');
const path = require('path');
const { log } = require('console');

const getAllRecipes = async (req, res) => {
    /* 
        const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=198&addRecipeInformation=true`;
    
         // extraemos los primero 198 recipes de la api 
        let { data } = await axios(url)
     */

    //esto es solo para leer el archivo JSON 
    const filePath = path.join(__dirname, '../../data.json');
    const rawData = fs.readFileSync(filePath);
    const data = JSON.parse(rawData);


    // buscamos todas las recetas de la BD y su relacion con el model Diets
    const dataBD = await Recipe.findAll({
        include: [{
            model: Diets,
            attributes: ['name'],
        }]
    });

    const allRecipesBD = dataBD.map((recipe) => {
        const { id, title, summary, image, healthScore, steps } = recipe.get();
        const diets = recipe.diets.map((diet) => diet.name);
        return {
            id,
            title,
            summary,
            image,
            healthScore,
            steps,
            diets
        };
    });


    // unificamos los reusltados de la BD y de la API
    data.results.unshift(...allRecipesBD) // agregamos a la data 

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
}
module.exports = getAllRecipes; 