var inventory = {};
window.AddItemToInventory = (item) =>{
	if(item in inventory){
		inventory.item += 1;
	}
	else{
		inventory.item = 1;
	}

	return true;
}

window.RemoveItemFromInventory = (item) => {
	if(item in inventory && inventory.item > 0){
		inventory.item -= 1;
		return true;
	}
	else{
		return false;
	}
	
}


window.NumItemsInInventory = (item) => {
	if(item in inventory){
		return inventory.item;
	}
	return 0;
}

window.InventoryString = () => {
	let invStr = "INVENTORY";
	for(let item in inventory){
		itemCount = inventory[item];
		if (itemCount > 0){
			invStr += `\n${itemCount} ${item}`;
		}
	}
	invStr += "---------------";

	return invStr
}