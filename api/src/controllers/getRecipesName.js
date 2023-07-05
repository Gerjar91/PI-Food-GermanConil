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
const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100`;
const Recipe = require("../db")

const getRecipesName = async (req, res) => {
    try {
        let name = req.query.name;
        let { data } = await axios(url);

        // FILTRO PARA RECETAS QUE CONTENGAN LA PALABRA NAME EN LA API 
        const recipesFilter = data.results.filter(el =>
            el.title.toLowerCase().includes(name.toLowerCase()));
        // BUSCAR RECETAS QUE CONTENGAN LA PALABRA NAME EN LA BDD
        Recipe.findAll({
            where: {
                texto: {
                    [Op.ilike]: sequelize.literal('%name%'),
                },
            },
        })
        // VERIFICAR SI SE ENCONTRÓ O NO LA RECETA 
        if (recipesFilter) {
            return res.status(200).json(recipesFilter);
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = getRecipesName;