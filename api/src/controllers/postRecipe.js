/* 
POST | /recipes
Esta ruta recibirá todos los datos necesarios para crear una nueva receta y relacionarla con los tipos de dieta solicitados.
Toda la información debe ser recibida por body.
Debe crear la receta en la base de datos, y esta debe estar relacionada con los tipos de dieta indicados (al menos uno).
 */

const { Recipe } = require('../db')
const { Diets } = require('../db')

const postRecipe = async (req, res) => {
    try {
        // creamos una nueva receta con lo que llega por  body 
        let { name, image, summary, healthScore, steps, dietname } = req.body
        const newRecipe = await Recipe.create({
            name,
            image,
            summary,
            healthScore,
            steps
        })
        //relacionar con las diets de la base de dato 
        //buscamos en la BDD que diet coincide con la dieta ingresada
        const diets = await Diets.findOne({ where: { name: dietname } });
        await newRecipe.addDiets(diets.dataValues.id)

        return res.status(200).json(newRecipe)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
module.exports = postRecipe


