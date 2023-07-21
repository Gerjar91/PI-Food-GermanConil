/* 
POST | /recipes
Esta ruta recibirá todos los datos necesarios para crear una nueva receta y relacionarla con los tipos de dieta solicitados.
Toda la información debe ser recibida por body.
Debe crear la receta en la base de datos, y esta debe estar relacionada con los tipos de dieta indicados (al menos uno).
 */

const { Op } = require('sequelize')
const { Recipe } = require('../db')
const { Diets } = require('../db')

const postRecipe = async (req, res) => {
    try {
        // creamos una nueva receta con lo que llega por  body 
        let { name, summary, image, hs, diets, steps } = req.body
        const newRecipe = await Recipe.create({
            name,
            image,
            summary,
            hs,
            steps
        })

        //relacionar con las diets de la base de dato 
        //buscamos en la BDD que diet coincide con la dieta ingresada
        const dietsbd = await Diets.findAll({
            where: {
                name: {
                    [Op.in]: diets //El operador Op.in indica que queremos buscar los registros cuyo valor de name esté presente en el array dietsArray.
                }
            }
        });
        await newRecipe.addDiets(dietsbd.map(diet => diet.id));

        return res.status(200).json(newRecipe)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
module.exports = postRecipe


