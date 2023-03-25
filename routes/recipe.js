var express = require('express');
var router = express.Router();
var recipeController = require('../controllers/recipeController');

/* GET data Category and show homePage. */
router.get('/', recipeController.getHomePage);
router.post('/search', recipeController.getDatafromKey);

router.get('/categories', recipeController.getAllCategories);
router.get('/categories/:name', recipeController.getRecipeByCountry);

router.get('/recipe/:id', recipeController.getDetailRecipe);
router.get('/explore-:name', recipeController.getAllRecipeByName);
router.get('/random-recipes', recipeController.getRandomRecipes);

router.get('/submit-recipe', recipeController.getFormRecipe);
router.post('/submit-recipe', recipeController.postFormRecipe);

module.exports = router;
