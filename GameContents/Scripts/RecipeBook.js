var currentPageRecipe;
var mainRecipe;

var base_recipe_book = {
	"Basic-Salsa": ["Smashed Tomato", "Chopped Basil"],
	"Tomato-Sauce": ["Boiled Baisc-Salsa"],
	"Dough": ["Flour", "Stirred Eggs"],
	"Noodles": ["Boiled Flattened Dough"],
	"Tutorial-Tortellini": ["Noodles", "Graded Cheese"]
}



function CookFood(ingrs){
	for(let item in ingrs){
		window.RemoveItemFromInventory(ingrs[item]);
	}
	for (let food in base_recipe_book){
		let foodIngr = base_recipe_book[food]
		if(foodIngr.sort().join(',')=== ingrs.sort().join(',')){
			return food
		}
	}

	return "";
}


window.CreateNewRecipe = (ele)=>{

	if(event.key === 'Enter') {
		let recipeName = ele.value
        if(recipeName in base_recipe_book || recipeName ==""){
			Engine.play("invalid_recipe_name")
		}
		else{
			let currentIngr = GetVar("IngrToCombine")
			base_recipe_book[recipeName] = currentIngr
			window.AddItemToInventory(recipeName)
			window.SetCurrentRecipe(recipeName)
		}
    }
	
	
}

function GetRecipeList(){
	let recList = "RECIPE LIST\n";
	for(let rec in base_recipe_book){
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
	let recipeList = base_recipe_book[rec]
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
	if (currentPageRecipe in base_recipe_book)
		return `HOW TO MAKE ${currentPageRecipe}:
		MIX TOGETHER:
		${CurrentIngredientList()}`;
	else
		return `${currentPageRecipe} DOES NOT EXIST (YET??)`;
}

