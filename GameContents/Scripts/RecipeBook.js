var currentPageRecipe;
var mainRecipe;

var BASE_RECIPE_BOOK = {
	"Basic-Salsa": ["Smashed Tomato", "Chopped Basil"],
	"Tomato-Sauce": ["Boiled Baisc-Salsa"],
	"Dough": ["Flour", "Stirred Eggs"],
	"Noodles": ["Boiled Flattened Dough"],
	"Tutorial-Tortellini": ["Noodles", "Graded Cheese"]
}

var CUSTOM_RECIPES = {}


function GetRecipeList(){
	let recList = "RECIPE LIST\n";
	for(let rec in BASE_RECIPE_BOOK){
		recList += '<<button "'+rec+'">>'+'<<scr'+'ipt>>SetCurrentRecipe("'+rec+'");<</sc'+'ript>><</but'+'ton>>\n'; 
		//have to do this for some reason dont ask questions
	}
	return recList;
}

window.SearchRecipeBook = (ele) =>{
    if(event.key === 'Enter') {
        window.SetCurrentRecipe(ele.value);  
    }
}


window.SetMainRecipe = (recipe) => {
	mainRecipe = recipe;
	currentPageRecipe = recipe;
	SetVar("MainRecipe", recipe)
	SetVar("CurrentRecipe", recipe)
	return recipe
}

window.SetCurrentRecipe = (recipeName = mainRecipe) => {
	currentPageRecipe = recipeName
	SetVar("CurrentRecipe", recipeName)
	Engine.play('recipe_book')

}

function IngredientListForRecipe(rec){
	let ingStr = ""
	let ingCount = 1
	let recipeList = BASE_RECIPE_BOOK[rec]
	for (let item in recipeList){
		ingStr += `${ingCount}. ${recipeList[item]}\n`
		ingCount += 1 
	}
	return ingStr
}

function CurrentIngredientList(){
	return IngredientListForRecipe(currentPageRecipe)
}



window.RecipeBookPageStr = () => {
	if (currentPageRecipe == "RECIPELIST"){
		return GetRecipeList();
	}
	if (currentPageRecipe in BASE_RECIPE_BOOK)
		return `HOW TO MAKE ${currentPageRecipe}:
		MIX TOGETHER:
		${CurrentIngredientList()}`;
	else
		return `${currentPageRecipe} DOES NOT EXIST (YET??)`;
}
