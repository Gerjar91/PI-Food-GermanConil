// Importar todos los routers;
const { Router } = require('express');
const getRecipesName = require('../controllers/getRecipesName');
const getRecipesById = require('../controllers/getRecipesById');
const getDiets = require('../controllers/getDiets');
const postRecipe = require('../controllers/postRecipe');
const getAllRecipes = require('../controllers/getAllRecipes');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes/name", getRecipesName);
router.use("/recipes/:id",getRecipesById)
router.use("/diets",getDiets)
router.use("/recipes",getAllRecipes)
router.post ("/recipe",postRecipe)

module.exports = router;
