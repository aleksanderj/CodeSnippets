// grab the mongoose module
var mongoose = require('mongoose');

var RecipeSchema = mongoose.Schema({
	body: {type: String, default: ''}
});

RecipeSchema.index({body: 'text'});

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Recipe', RecipeSchema);
