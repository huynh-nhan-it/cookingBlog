const mongoose = require('mongoose');
var support = require('../untils/support');


const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'This field is required.'
  },
  description: {
    type: String,
    required: 'This field is required.'
  },
  email: {
    type: String,
    required: 'This field is required.'
  },
  ingredients: {
    type: Array,
    required: 'This field is required.'
  },
  category: {
    type: String,
    enum: support.getNameCategories(),
    required: 'This field is required.'
  },
  image: {
    type: String,
    required: 'This field is required.'
  },
});


var recipe = mongoose.model("recipe", recipeSchema);

module.exports = recipe;