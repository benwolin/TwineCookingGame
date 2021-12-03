/*
function ModifierSelectionCallback(ingr){
	if(ingr in inventory){
		inventory[ingr] -= 1;
		window.AddItemToInventory(`${mod} ${ingr}`)
	}
	Engine.play("cooking_table")
}
*/

window.ApplyModifier = (mod)=> {
	PromptInventorySelection((ingr)=>{
		if(ingr in inventory){
			inventory[ingr] -= 1;
			window.AddItemToInventory(`${mod} ${ingr}`);
		}
		Engine.play("cooking_table");
	}
	, `What would you like to make ${mod}?`)
}

window.TrashStuff = ()=>{
	PromptInventorySelection(
		(ingr) =>{
			if(ingr in inventory){
				inventory[ingr] -=1;
				Engine.play("inventory_selection")
			}
			else{
				Engine.play("main_kitchen")
			}
			
		},
		"Select items to trash"	
	)
	
}