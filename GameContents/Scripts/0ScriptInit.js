window.Engine = Engine;
config.history.controls = false;

//COMMON FUNCTIONS
function SetVar (varname, val){
	state.active.variables[varname] = val;
}
function GetVar(varname){
	return state.active.variables[varname];
}

function UpdateStoryCaption(){
	return new Wikifier(null, '<<updatebar>>')
}

async function SleepCallback(cb, timeout){
	await new Promise(r => setTimeout(r, timeout));
	cb();
}
//END COMMON FUNCTIONSs

//INITIALIZE PATH
const OVERRIDE_PATH = true
if (OVERRIDE_PATH || window.hasOwnProperty("storyFormat") || (document.location.href.indexOf("AppData") !== -1)) {
	/* Change this to the path where the HTML file is
		 located if you want to run this from inside Twine. */
	// Running inside Twine application
	setup.Path = "C:/Users/benwo/Documents/GitHub/TwineCookingGame/";
} else {
	// Running in a browser
	setup.Path = "";
}
setup.Path += "Assets/"
setup.SoundPath = setup.Path + "sounds/";
setup.ImagePath = setup.Path + "images/";

SetVar("basePath", setup.Path);
SetVar("imagePath", setup.ImagePath);

//<<= '<base href="' + $basePath + '">'>>
var baseHtml = `<base href="${setup.Path}">`
$('body').prepend(baseHtml);
//END INITIALIZE PATH


//CHARACTER STATS
var SELECTED_CHARACTER = ""
const CHARACTER_INFO = {
	"Jelly":{
		"MaxInventory": 6,
		"Image": `${setup.ImagePath}Characters/Jelly.png`
	},
	"Crabby":{
		"MaxInventory": 4,
		"Image": `${setup.ImagePath}Characters/Crabby.png`
	},
	"Blobby":{
		"MaxInventory": 2,
		"Image": `${setup.ImagePath}Characters/Blobby.png`
	}
}

function CurrentCharacterInfo(){
	return CHARACTER_INFO[SELECTED_CHARACTER]
}

const DISPLAYED_STATS = ["MaxInventory"]
window.CharacterStatString = () => {
	if (SELECTED_CHARACTER == "")
		return ""

	stats = `---${SELECTED_CHARACTER} CHARACTER STATS---`
	



}
//END CHARACTER STATS