//CHARACTER STATS
var SELECTED_CHARACTER = ""
const CHARACTER_INFO = {
	"Jelly":{
		"MaxInventory": 14,
		"Image": `${setup.ImagePath}Characters/Jelly.png`,
		"SadImage": `${setup.ImagePath}Characters/Sad Jelly.png`,
		"HappyImage": `${setup.ImagePath}Characters/Happy Jelly.png`,
		"Description": "A determined jellyfish"
	},
	"Crabby":{
		"MaxInventory": 10,
		"Image": `${setup.ImagePath}Characters/Crabby.png`,
		"SadImage": `${setup.ImagePath}Characters/Sad Crabby.png`,
		"HappyImage": `${setup.ImagePath}Characters/Happy Crabby.png`,
		"Description": "A penny pinching crab"
	},
	"Blobby":{
		"MaxInventory": 6,
		"Image": `${setup.ImagePath}Characters/Blobby.png`,
		"SadImage": `${setup.ImagePath}Characters/Sad Blobby.png`,
		"HappyImage": `${setup.ImagePath}Characters/Happy Blobby.png`,
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
	SetVar("happyCharImage", CHARACTER_INFO[character].HappyImage)
	SetVar("sadCharImage", CHARACTER_INFO[character].SadImage)
	SELECTED_CHARACTER = character
	UpdateEndMan()
	Engine.play("character_selected")
}

