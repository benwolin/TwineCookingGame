var inventory = {};

function MaxInventory(){
	let charInfo = CurrentCharacterInfo()
	return charInfo != null? charInfo.MaxInventory : 1;

}

function InventoryCount(){
	let itemCount = 0
	for(let item in inventory){
		itemCount += inventory[item]
	}
	return itemCount
}

function ClearInventory(){
	inventory = {}
}

window.AddItemToInventory = (item) =>{
	if (InventoryCount() >= MaxInventory()){
		return false
	}
	if(item in inventory){
		inventory[item] += 1;
	}
	else{
		inventory[item] = 1;
	}
	UpdateStoryCaption()
	return true;
}

window.RemoveItemFromInventory = (item) => {
	if(item in inventory && inventory[item] > 0){
		inventory[item] -= 1;
		UpdateStoryCaption()
		return true;
	}
	else{
		return false;
	}
	
}


window.NumItemsInInventory = (item) => {
	if(item in inventory){
		return inventory[item];
	}
	return 0;
}

window.InventoryString = () => {
	let invStr = "INVENTORY";
	for(let item in inventory){
		let itemCount = inventory[item];
		if (itemCount > 0){
			invStr += `\n${itemCount} ${item}`;
		}
	}
	if(InventoryCount() >= MaxInventory())
		invStr += "\nAT MAX INVENTORY"
	invStr += "\n---------------";

	return invStr
}

//INVENTORY SELECTION
window.SelectionCallback = null
var inventoryPrompt = ""
function PromptInventorySelection(callback, prompt = ""){
	//SetVar("prevpassage", passage())
	inventoryPrompt = prompt
	window.SelectionCallback = callback
	Engine.play("inventory_selection")
}

window.InventorySelectionString = () => {
	let invStr = inventoryPrompt + "\n\n"
	for(let item in inventory){
		if(inventory[item] > 0){
			invStr += '<<button "'+item+'">><<'+'script>>'+'SelectionCallback("'+item+'");<<'+'/script>>'+'<</bu'+'tton>>\n'
		}
	}

	invStr += '\n<<button "'+'GO BACK'+'">><<'+'script>>'+'SelectionCallback("'+'NONE'+'");<<'+'/script>>'+'<</bu'+'tton>>\n'
	return invStr
}