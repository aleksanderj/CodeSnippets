angular.module('MainCtrl', []).controller('MainController', function($scope, $q, $http) {

	$scope.tagline = 'To the moon and back!';	

	$scope.recipes = [];

	$scope.searchString = "";

	$scope.$watch("searchString", function(newValue, oldValue) {
		console.log("S");
		if (newValue == "") {
			getAllRecipes();
		} else {
			getRecipesBySearch(newValue);
		}
	}, true);

	getAllRecipes();

	function getAllRecipes() {
		$scope.recipes = [];
		$http.get('/findRecipes').then(function(result) {
			$scope.recipes = result.data;
			$('pre code').each(function(i, block) {
			    hljs.highlightBlock(block);
			  });
		});
	}

	function getRecipesBySearch(searchString) {
		$http.post('/recipes', {searchString: searchString}).then(function(result) {
			$scope.recipes = [];
			$scope.recipes = result.data;
			$('pre code').each(function(i, block) {
			    hljs.highlightBlock(block);
			  });
		});
	}

	$scope.updateRecipe = function(data, id) {
		$http.post('/updateRecipe', {id: id, recipeBody: data}).then(function() {
			getAllRecipes();
		});
	};

	$scope.addCommand = function() {
		$scope.recipes.push({body: null})
		setTimeout(function() {
			var elements = $('.recipe-main');
			elements[elements.length-1].click();
		}, 50);
	}


    $(document).keydown(function(e) {
	    if (e.keyCode == 67 && e.ctrlKey) {
			$('#add-btn').click();
	    }
	});

	$('#search-input').keyup(function(e) {
		if (e.keyCode == 27) {
			$scope.searchString = "";
			$(this).val("");
			getAllRecipes();
		}
	});

	$scope.deleteRecipe = function(id) {
		$http.post('/removeRecipe', {id: id}).then(function() {
			if ($scope.searchString != "") {
				getRecipesBySearch($scope.searchString);
			} else {
				getAllRecipes();
			}
		});
	};

	$scope.selectedStyle = "Tomorrow-Night";

	$scope.styles = [
		"Default",
		"Agate",
		"Androidstudio",
		"Arduino-Light",
		"Arta",
		"Ascetic",
		"Atelier-Cave-Dark",
		"Atelier-Cave-Light",
		"Atelier-Dune-Dark",
		"Atelier-Dune-Light",
		"Atelier-Estuary-Dark",
		"Atelier-Estuary-Light",
		"Atelier-Forest-Dark",
		"Atelier-Forest-Light",
		"Atelier-Heath-Dark",
		"Atelier-Heath-Light",
		"Atelier-Lakeside-Dark",
		"Atelier-Lakeside-Light",
		"Atelier-Plateau-Dark",
		"Atelier-Plateau-Light",
		"Atelier-Savanna-Dark",
		"Atelier-Savanna-Light",
		"Atelier-Seaside-Dark",
		"Atelier-Seaside-Light",
		"Atelier-Sulphurpool-Dark",
		"Atelier-Sulphurpool-Light",
		"Atom-One-Dark",
		"Atom-One-Light",
		"Brown-Paper",
		"Codepen-Embed",
		"Color-Brewer",
		"Darcula",
		"Dark",
		"Darkula",
		"Docco",
		"Dracula",
		"Far",
		"Foundation",
		"Github-Gist",
		"Github",
		"Googlecode",
		"Grayscale",
		"Gruvbox-Dark",
		"Gruvbox-Light",
		"Hopscotch",
		"Hybrid",
		"Idea",
		"Ir-Black",
		"Kimbie-Dark",
		"Kimbie-Light",
		"Magula",
		"Mono Blue",
		"Monokai-Sublime",
		"Monokai",
		"Obsidian",
		"Ocean",
		"Paraiso-Dark",
		"Paraiso-Light",
		"Pojoaque",
		"Purebasic",
		"Qtcreator-Dark",
		"Qtcreator-Light",
		"Railscasts",
		"Rainbow",
		"School-Book",
		"Solarized-Dark",
		"Solarized-Light",
		"Sunburst",
		"Tomorrow-Night-Blue",
		"Tomorrow-Night-Bright",
		"Tomorrow-Night-Eighties",
		"Tomorrow-Night",
		"Tomorrow",
		"Vs",
		"Xcode",
		"Xt 256",
		"Zenburn"
	]

});