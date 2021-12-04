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

window.AddIngredientToCombine = ()=>{
	let currentIngr = GetVar("IngrToCombine")
	PromptInventorySelection(
		(ingr)=>{
			if(ingr in inventory && !(currentIngr.includes(ingr))){
				currentIngr.push(ingr)
				SetVar("IngrToCombine", currentIngr)
			}
			Engine.play("combine_ingredients")
		},
		"Select item to combine"

	)
}

window.CombineIngredients= ()=>{
	let currentIngr = GetVar("IngrToCombine");
	if(currentIngr.length <= 1){
		Engine.play("main_kitchen")
		return
	}
	let cookedItem = CookFood(currentIngr);
	if(cookedItem == ""){
		Engine.play("name_new_food")
	}
	else{
		window.AddItemToInventory(cookedItem)
		Engine.play("main_kitchen")
	}
	
}

window.DishTurnIn = ()=>{
	PromptInventorySelection(
		(ingr)=>{
			if(ingr in inventory){
				//TODO
			}
			else{
				Engine.play("main_kitchen")
			}
		},
		"Turn in your final dish"

	)
}