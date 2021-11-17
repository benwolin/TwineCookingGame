window.Engine = Engine;

if (window.hasOwnProperty("storyFormat") || (document.location.href.indexOf("AppData") !== -1)) {
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

function SetVar (varname, val){
	state.active.variables[varname] = val;
}
function GetVar(varname){
	return state.active.variables[varname];
}

