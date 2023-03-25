const mongoose = require('mongoose');
var Category = require('../models/category');
var Recipe = require('../models/recipe');
const recipeController = require('../controllers/recipeController');
 
async function Connect() {
    await mongoose.connect(process.env.MONGOOSE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
      console.log('Connected to database')
    }).catch(err => {
      console.log('Error connecting to database:', err.message)
    })

    try {
      const categories = await Category.find({});
      const recipes = await Recipe.find({});
      if (categories.length === 0) {
        await recipeController.insertCategories();
      }
      if (recipes.length === 0) {
        await recipeController.insertRecipes();
      }
    } catch (err) {
      console.log('err' + err);
    }
}



module.exports = {Connect}