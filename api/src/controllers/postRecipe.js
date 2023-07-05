const { Recipe} = require('../db')
/* 
POST | /recipes
Esta ruta recibirá todos los datos necesarios para crear una nueva receta y relacionarla con los tipos de dieta solicitados.
Toda la información debe ser recibida por body.
Debe crear la receta en la base de datos, y esta debe estar relacionada con los tipos de dieta indicados (al menos uno).
 */


const postRecipe = (req, res) => {

    
    try {
        let {name,image,summary,healthScore,steps} = req.body
        Recipe.create({
            name,image,summary,healthScore,steps
        })
    } catch (error) {

    }
}
module.exports = postRecipe


