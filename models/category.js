var mongoose = require("mongoose");

var categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This fild is required.'
    },
    image: {
        type: String,
        required: 'This fild is required.'
    },
    
});

var category = mongoose.model("category", categorySchema);

module.exports = category;