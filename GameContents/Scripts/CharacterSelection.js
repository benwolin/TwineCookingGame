window.SelectCharacter = (character) => {
	SetVar("character", character)
	SetVar("charImage", `${setup.ImagePath}Characters/${character}.png`)
	Engine.play("character_selected")
}