var mongoose       = require('mongoose');
var Recipe 		   = require('./models/Recipe.js');

module.exports = function(app) {

	app.post('/saveRecipe', function(req, res) {
		var recipe = new Recipe(req.body);
		recipe.save(function(err) {
			if (err) throw err;

			res.send(true);
		});
	});

	app.post('/updateRecipe', function(req, res) {

		Recipe.findOne({_id: req.body.id}, function(err, result) {
			if (err) throw err;

			if (result) {
				result.body = req.body.recipeBody;
				result.save(function(err) {
					if (err) throw err;
					res.send(true);
				});
			} else {
				var newRecipe = new Recipe({body: req.body.recipeBody});
				newRecipe.save(function(err) {
					if (err) throw err;
					res.send(true);
				});
			}
		});
	});

	app.get('/findRecipes', function(req, res) {
		var query = Recipe.find();

		query.exec(function(err, recipes) {
			if (err) {
				throw err;
			}

			res.json(recipes);
		});
	});

	app.post('/recipes', function(req, res) {
		Recipe.find({$text: {$search: req.body.searchString, $language: "en"}}, 
			{score: {$meta: "textScore"}})
		.sort({score: {$meta: "textScore"}})
		.exec(function(err, docs) {
			if (err) throw err;

			res.json(docs);
		});
	});

	app.post('/removeRecipe', function(req, res) {
console.log(req.body.id);
		Recipe.findByIdAndRemove(req.body.id, function(err, recipe) {
			if (err) throw err;

			res.send(true);
		});
	});

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
};