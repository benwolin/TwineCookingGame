
var CriticPoints = 0;
var CreativityPoints = 0;
SetVar("CriticPoints", CriticPoints)
SetVar("CreativityPoints", CreativityPoints)

function AddCriticPoints(numPoints){
	CriticPoints += numPoints
	CreativityPoints += (100-numPoints)
	SetVar("CriticPoints", CriticPoints)
	SetVar("CreativityPoints", CreativityPoints)
}

var storyIndex = 0
const StoryLinePath = [
	{
		"RecipeName": "",
		"HighAccuracy": "",
		"LowAccuracy": ""
	},
	{
		"RecipeName": "",
		"HighAccuracy": "",
		"LowAccuracy": ""
	},
	{
		"RecipeName": "",
		"HighAccuracy": "",
		"LowAccuracy": ""
	}
]