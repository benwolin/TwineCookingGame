window.SelectCharacter = (character) => {
	SetVar("character", character)
	SetVar("charImage", CHARACTER_INFO[character].Image)
	SELECTED_CHARACTER = character
	Engine.play("character_selected")
}