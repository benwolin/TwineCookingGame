var currentPageRecipe;
var mainRecipe;
var openedSecretRecipeCount = 0;
var base_recipe_book = {
	"Dough": ["flour", "whisked egg"],
	"Noodles": ["boiled smashed Dough", "salt"],
	"Tutorial-Tortellini": ["Noodles", "baked chopped cheese"],
	"Crepes": ["baked Batter", "salt", "strawberry"],
	"Batter": ["whisked egg", "flour", "milk"],
	"Basic-Bitch-Seasoning": ["garlic", "salt", "black pepper"],
	"Cheesy-Onion-Surprise": ["cheese", "chopped onion", "Basic-Bitch-Seasoning"],
	"French-Onion-Soup": ["Broth", "baked Cheesy-Onion-Surprise"],
	"Broth":["butter", "boiled olive oil"],
	"Ratatouille": ["smashed tomato", "chopped Bunch-of-Veggies", "Basic-Bitch-Seasoning", "olive oil"],
	"Bunch-of-Veggies":["cucomba", "tomato", "eggplant", "pear"],
	"the-secret-recipe-DO-NOT-OPEN-DANGEROUS":["baked love", "whisked joy", "boiled creativity", "Basic-Bitch-Seasoning"]
}

var createdRecipies = [];

var recipe_page_images = {
	"Default": `${setup.ImagePath}RecipePages/RecipeBook.png`,
	"Crepes": `${setup.ImagePath}RecipePages/Crepes.png`,
	"French-Onion-Soup": `${setup.ImagePath}RecipePages/French Onion Soup.png`,
	"Tutorial-Tortellini": `${setup.ImagePath}RecipePages/Tortellini.png`,
	"Ratatouille": `${setup.ImagePath}RecipePages/Crepes.png`
}

function SecretRecipeOpened(){
	if(openedSecretRecipeCount < 1){
		AddCreativityPoints(50)
	}
	else if (openedSecretRecipeCount < 5){
		AddCreativityPoints(5)
	}
	else{
		base_recipe_book["the-secret-recipe-DO-NOT-OPEN-DANGEROUS"].push("OK STOP OPENING THE SECRET RECIPE")
	}

	openedSecretRecipeCount += 1
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


function GetRecipeLength(recName){
	if(recName in base_recipe_book){
		return base_recipe_book[recName].join("").length
	}
}


function _BaseIngr(modifiedIngr){
	return modifiedIngr.split(" ").at(-1);
}

function recur(recip){
	if(recip in base_recipe_book){

	}
	else{
		return recip
	}
}

function GetAllIngrForRecipe(recipName){
	return recipName in base_recipe_book? base_recipe_book[recipName]:[recipName];
	/*
	let baseName = _BaseIngr(recipName)
	console.log("getting ingrs for" + baseName)
	if(baseName in base_recipe_book){	
		let ingrs = base_recipe_book[baseName]
		let subIngrs = []

		for(let i = 0; i < ingrs.length; i++){
			console.log("getting ingrs for recipe"+ingrs[i])
			let retrievedIngrs = GetAllIngrForRecipe(ingrs[i])
			
			subIngrs.concat(retrievedIngrs)
		}
		console.log("retrieved "+subIngrs)
		return subIngrs
	}
	else{
		console.log('retuning base ingr' + recipName)
		return [recipName]
	}
	*/


}

function IsCreatedRecipe(rec){
	return createdRecipies.includes(rec)
}

function GetPercentRecipeSuccess(base, real){
	
	let baseIngr = GetAllIngrForRecipe(base) //base in base_recipe_book? base_recipe_book[base]:[base]; 
	let realIngr = GetAllIngrForRecipe(real) //real in base_recipe_book? base_recipe_book[real]:[real];
	let totalIngr = baseIngr.length + realIngr.length
	console.log('TOTAL INGR' + realIngr)
	let diffBase = baseIngr.filter(x => !realIngr.includes(x)).map(_BaseIngr);
	let diffReal = realIngr.filter(x => !baseIngr.includes(x)).map(_BaseIngr);
	console.log('diffs base real')
	console.log(diffBase)
	console.log(diffReal)

	let totalDiff = diffBase.length + diffReal.length;

	let bigDiffs = diffBase.filter(x => !diffReal.includes(x)).concat(diffReal.filter(x => !diffBase.includes(x)));
	console.log('bigDiffs ' + bigDiffs)
	let bigDiffCount = bigDiffs.length;
	let smallDiffCount = totalDiff - bigDiffCount;
	console.log(bigDiffCount)
	console.log(smallDiffCount);

	let sumDiffCount = bigDiffCount + (.5*smallDiffCount);
	console.log("sum diff " + sumDiffCount)
	let accur = (sumDiffCount/(totalIngr) *100)
	console.log('accur '+ accur )
	return (100 - accur)
}


window.CreateNewRecipe = (ele)=>{
	if(event.key === 'Enter') {
		let recipeName = ele.value;
		recipeName.replace(" ", "-");
        if(recipeName in base_recipe_book || recipeName ==""){
			Engine.play("invalid_recipe_name")
		}
		else{
			let currentIngr = GetVar("IngrToCombine")
			base_recipe_book[recipeName] = currentIngr
			createdRecipies.push(recipeName)
			window.AddItemToInventory(recipeName)
			window.SetCurrentRecipe(recipeName)
			AddCreativityPoints(10)
			
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
	if (currentPageRecipe== "the-secret-recipe-DO-NOT-OPEN-DANGEROUS"){
		SecretRecipeOpened()
	}
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


window.RecipePageImage = () => {
	let recipeImagePath = currentPageRecipe in recipe_page_images?recipe_page_images[currentPageRecipe]: recipe_page_images["Default"]
	return '<img src="'+recipeImagePath+'">'
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

