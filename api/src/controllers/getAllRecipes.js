
require('dotenv').config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Recipe } = require("../db");
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

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


    let allRecipes = data.results.map((el) => {
        return {
            id: el.id,
            name: el.title,
            image: el.image,
            diets: el.diets,
            HS:el.healthScore
        }
    })
    return res.status(200).json(allRecipes);
}
module.exports = getAllRecipes; 