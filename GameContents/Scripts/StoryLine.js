var CriticPoints = 0;
var CreativityPoints = -250;
SetVar("CriticPoints", CriticPoints)
SetVar("CreativityPoints", CreativityPoints)
var recentAccuracy = 0;
var END_SCREENS = {
	"good": `${setup.ImagePath}/UI/Happy End.png`,
	"bad": `${setup.ImagePath}/UI/Not Happy End.png`
}

function UpdateEndMan(){
	SetVar("EndMan", CreativityPoints > CriticPoints? GetVar("happyCharImage"): GetVar("sadCharImage"))
}
SetVar("EndMan", "")

window.EndScreenStr = ()=>{
	let ending = CreativityPoints > CriticPoints? "good":"bad"
	SetVar("EndImg", END_SCREENS[ending])
	UpdateEndMan()
	return `[img[$EndImg]]\n[img[$EndMan]]`
}

function AddCreativityPoints(numPoints){
	CreativityPoints += numPoints
	SetVar("CreativityPoints", CreativityPoints)
	UpdateEndMan()
}
function AddCriticPoints(numPoints){
	CriticPoints += numPoints
	SetVar("CriticPoints", CriticPoints)
	AddCreativityPoints(50-numPoints)
}

function CurrentStoryLine(){
	return StoryLinePath[storyIndex]
}

function TurnInDish(ingr){
	SetVar("TurnedInRecipe", ingr)
	let accuracy = GetPercentRecipeSuccess(ingr, mainRecipe);
	recentAccuracy = accuracy
	SetVar("RecentAccuracy", accuracy)
	AddCriticPoints(accuracy)
	if(IsCreatedRecipe(ingr)){
		AddCreativityPoints(30)
		if(GetRecipeLength(ingr)>70){
			AddCreativityPoints(100)
		}
	}
	else if(ingr in base_recipe_book && ingr != mainRecipe){
		AddCreativityPoints(30)
	}
	let currentStory = CurrentStoryLine()


	if(accuracy>70){
		Engine.play("goodbitch")
		//Engine.play(currentStory.HighAccuracy)
	}
	else{
		Engine.play("badbitch")
		//Engine.play(currentStory.LowAccuracy)
	}

	storyIndex += 1;
	SetMainRecipe(CurrentStoryLine().RecipeName)
	if(mainRecipe == "NO MORE RECIPES"){
		SetVar("lastRecipe", true)
	}
	ClearInventory()

	
}
SetVar("lastRecipe", false)



var storyIndex = 0
const StoryLinePath = [
	{
		"RecipeName": "Tutorial-Tortellini",
		"HighAccuracy": "TortGood",
		"LowAccuracy": "TortBad"
	},
	{
		"RecipeName": "French-Onion-Soup",
		"HighAccuracy": "FrenchGood",
		"LowAccuracy": "FrenchBad"
	},
	{
		"RecipeName": "Ratatouille",
		"HighAccuracy": "RatGood",
		"LowAccuracy": "RatBad"
	},
	{
		"RecipeName": "Crepes",
		"HighAccuracy": "CrepGood",
		"LowAccuracy": "CrepBad"
	},
	{
		"RecipeName": "NO MORE RECIPES"
	}
]