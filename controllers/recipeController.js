var support = require('../untils/support');
var Category = require('../models/category');
var Recipe = require('../models/recipe');
const category = require('../models/category');
const mime = require('mime-types');
var path = require('path');


class recipeController {

    async insertCategories() {
        try {
            await Category.insertMany(support.dateCategories())
        } catch (error) {
            console.log('error' + error);
        }
    }

    async insertRecipes() {
        try {
            await Recipe.insertMany(support.dataRecipes())
        } catch (error) {
            console.log('error' + error);
        }
    }

    async getHomePage(req, res) {
        try {
            const limitCategories = 5;
            const RecipeCountries = [];
            const categories = await Category.find({}).limit(limitCategories);
            const lastest = await Recipe.find({}).sort({_id: -1}).limit(limitCategories);
            for (let i = 0; i < 3 ; i++) {
                let recipe = await Recipe.find({category: categories[i].name}).limit(limitCategories);
                RecipeCountries.push(recipe);
            }
            
            const recipes = {lastest, RecipeCountries};
            if (categories.length === 0) return res.status(500).json({code: -1, message: 'No categories were found'});

            return res.render('index', {title: 'Cooking Blog - Home', categories, recipes});

        } catch (error) {
            return res.status(500).json({code: -1, message: err});
        }
    }

    async getDetailRecipe(req, res) {
        try {
            let idRecipe = req.params.id;
            const recipe = await Recipe.findById(idRecipe);
            if (!recipe) return res.status(500).json({code: -1, message: 'No recipe were found'});
            return res.render('recipe', {title: 'Cooking Blog - Home', recipe});

        } catch (error) {
            return res.status(500).json({code: -1, message: error});
        }
    }

    async getAllCategories(req, res) {
        try {
            const categories = await Category.find({})
            if (categories.length === 0) return res.status(500).json({code: -1, message: 'No categories were found'});

            return res.render('categories', {title: 'Cooking Blog - Home', categories});

        } catch (error) {
            return res.status(500).json({code: -1, message: error});
        }
    }

    async getRecipeByCountry(req, res) {
        try {
            let categoryByCountry = req.params.name;
            const recipes = await Recipe.find({category: categoryByCountry});
            return res.render('exploreCategories', {title: 'Cooking Blog - Home', recipes, country: categoryByCountry});
        } catch (error) {
            return res.status(500).json({code: -1, message: error});
        }
    }

    async getDatafromKey(req, res) {
        try {
            let keyWord = req.body.searchRecipe;
            const regex = new RegExp(keyWord, 'i');
            const recipes = await Recipe.find({$or: [{category: {$regex: regex}}, {name: {$regex: regex}}]});
            return res.render('search', {title: 'Cooking Blog - Home', recipes});
        } catch (error) {
            return res.status(500).json({code: -1, message: error});
        }
    }

    async getAllRecipeByName(req, res) {
        try {
            const limitRecipe = 20;
            let name = req.params.name;
            let query = name.toLowerCase() == 'lastest' ? '' : name;
            let recipes = query == '' ? await Recipe.find({}).sort({_id: -1}).limit(limitRecipe) : await Recipe.find({category: name});
            return res.render('exploreRecipe', {title: 'Cooking Blog - Home', recipes, name: name == 'lastest' ? 'Lastest': name});
        } catch (error) {   
            return res.status(500).json({code: -1, message: error});
        }
    }

    async getRandomRecipes(req, res) {
        try {
            const limitRandom = 5;
            let count = await Recipe.find({}).countDocuments();
            let recipes = [];
            for(let i = 0; i < limitRandom; i++) {
                let randomNumber = Math.floor(Math.random() * count);
                let recipe = await Recipe.findOne({}).skip(randomNumber).exec();
                recipes.push(recipe);
            }
            return res.render('exploreRandom', {title: 'Cooking Blog - Home', recipes});
        } catch (error) {
            return res.status(500).json({code: -1, message: error});    
        }
    }

    async getFormRecipe(req, res) {
        try {
            let listNameCountry = support.getNameCategories();
            const infoErrorsObj = req.flash('infoErrors');
            const infoSubmitObj = req.flash('infoSubmit');
            return res.render('submit-recipe', {title: 'Cooking Blog - Home', listNameCountry, infoSubmitObj, infoErrorsObj});
        } catch (error) {
            return res.status(500).json({code: -1, message: error});    
        }
    }

    async postFormRecipe(req, res) {
        try {
            let imageUploadFile;
            let uploadPath;
            let newImageName;
            const mimeType = mime.lookup(req.files.image.name);
            const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg', 'image/tiff'];
            if(!req.files || Object.keys(req.files).length === 0){
                req.flash('infoErrors', 'No Files where uploaded.');
                return res.redirect('/submit-recipe');
            }

            if (!allowedImageTypes.includes(mimeType)){
                req.flash('infoErrors', 'The selected file is not valid.');
                return res.redirect('/submit-recipe');
            }
            else {
        
              imageUploadFile = req.files.image;
              newImageName = Date.now() + imageUploadFile.name;
        
              uploadPath = path.join('./public/uploads/' + newImageName);
              
              await imageUploadFile.mv(uploadPath);
              const newRecipe = new Recipe({
                name: req.body.name,
                description: req.body.description,
                email: req.body.email,
                ingredients: req.body.ingredients,
                category: req.body.category,
                image: newImageName
              });
              
              await newRecipe.save();
          
              req.flash('infoSubmit', 'Recipe has been added.')
              return res.redirect('/submit-recipe');
            }

          } catch (error) {
            return res.status(500).json({code: -1, message: error});    
          }
    }
 }

module.exports = new recipeController();