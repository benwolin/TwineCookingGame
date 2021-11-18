//CHARACTER STATS
var SELECTED_CHARACTER = ""
const CHARACTER_INFO = {
	"Jelly":{
		"MaxInventory": 6,
		"Image": `${setup.ImagePath}Characters/Jelly.png`,
		"Description": "A determined jellyfish"
	},
	"Crabby":{
		"MaxInventory": 4,
		"Image": `${setup.ImagePath}Characters/Crabby.png`,
		"Description": "A penny pinching crab"
	},
	"Blobby":{
		"MaxInventory": 2,
		"Image": `${setup.ImagePath}Characters/Blobby.png`,
		"Description": "An old man"
	}
}

function CurrentCharacterInfo(){
	if(SELECTED_CHARACTER != "")
		return CHARACTER_INFO[SELECTED_CHARACTER]
	return null
}

const DISPLAYED_STATS = ["MaxInventory"]
window.CharacterStatString = () => {
	if (SELECTED_CHARACTER == "")
		return "";
	let charInfo = CurrentCharacterInfo()
	return `${SELECTED_CHARACTER} CHARACTER STATS
	${charInfo.Description}

	MAX INVENTORY: ${charInfo.MaxInventory}
	------------------------`;

}
//END CHARACTER STATS


window.SelectCharacter = (character) => {
	SetVar("character", character)
	SetVar("charImage", CHARACTER_INFO[character].Image)
	SELECTED_CHARACTER = character
	Engine.play("character_selected")
}

