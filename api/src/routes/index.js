const { Router } = require('express');
const getRecipesName = require('../controllers/getRecipesName');
const getRecipesDetail = require('../controllers/getRecipesDetail');
const getDiets = require('../controllers/getDiets');
const postRecipe = require('../controllers/postRecipe');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes/name",getRecipesName) 
router.use("/recipes/:id",getRecipesDetail)
router.use("/diets",getDiets)
/* router.post ("/recipe",postRecipe) */

module.exports = router;
