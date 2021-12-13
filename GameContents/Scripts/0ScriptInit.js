window.Engine = Engine;
config.history.controls = false;

prehistory['no-stow-and-disable-debug'] = function (taskname) { //remove ability to close sidebar
	// This should be a single use task.
	delete prehistory[taskname];

	// Remove the UI bar's stow/unstow toggle button.
	$('#ui-bar-toggle').remove();

	// Disable Test mode's debug views initially.
	DebugView.disable();
}; 

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


