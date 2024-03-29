/**
 * CONSTRUCTORS
 */
// function to display receipes
async function displayRecipes(listRecipes) {
    const recipesSection = document.getElementById('recipes-list')
    recipesSection.innerHTML = ""
    
    const listIngredients = getAllIngredients(listRecipes)
    const listAppliance = getAllAppliances(listRecipes)
    const listUstensils = getAllUstensils(listRecipes)

    updateList(listIngredients,'ingredients')
    updateList(listAppliance,'appliance')
    updateList(listUstensils,'ustensils')

    if(listRecipes.length>0){
        listRecipes.forEach((recipe) => {
            const recipeModel = recipeFactory(recipe);
            const recipeCardDOM = recipeModel.getRecipeCardDOM();
            recipesSection.appendChild(recipeCardDOM);
        });
    }else{
        const div_none_recipe = document.createElement("div")
        div_none_recipe.setAttribute("class",'none-recipe')
        div_none_recipe.innerText = 'Aucune recette ne contient "'+inputSearchProduct.value.trim()+'" vous pouvez chercher '+'"tarte au pommes"'+'"ou poisson"'
        recipesSection.appendChild(div_none_recipe);
    }
};
// function to display dropdowns 
function displayDropdown(){
    const filtersSection = document.getElementById('filters')
    const filtersType = ["ingredients","appliance","ustensils"]
    filtersType.forEach((filter)=>{
        const dropdownModel = dropdownFactory(filter);
        const dropdownCardDom = dropdownModel.getDropDownCardDOM();
        filtersSection.appendChild(dropdownCardDom)
    })
}
/**
 * SETTERS
 */
//function to get all ingredients
function getAllIngredients(recipes){
    const ingredientsList = []
    recipes.forEach(recipe => {
        const ingredientsRecipe = recipe.ingredients
        ingredientsRecipe.forEach(ingredient => {
            const ingredientName = ingredient.ingredient
            if(!ingredientsList.includes(ingredientName)){
                ingredientsList.push(ingredientName)
            }
        });
    });
    return ingredientsList
}
//function get all appliances
function getAllAppliances(recipes){
    const appliancesList = []
    recipes.forEach(recipe => {
        const appliance = recipe.appliance
        if(!appliancesList.includes(appliance)){
            appliancesList.push(appliance)
        }
    });
    return appliancesList
}
//function to get all ustensils
function getAllUstensils(recipes){
    const ustensilsList = []
    recipes.forEach(recipe => {
        const ustensils = recipe.ustensils
        ustensils.forEach(element => {
            if(!ustensilsList.includes(element)){
                ustensilsList.push(element)
            }
        });
    });
    return ustensilsList
}
/**
 * FILTERS MANAGERS
 */
//function to add filter to the section filters tags
function addFilter(e){
    const filter = e.target
    const filterValue = filter.innerHTML
    const listFilter = filter.parentNode
    
    filter.style.display = "none"

    const typeFilter = listFilter.getAttribute("aria-label").split('-')[1]

    const filterModel = filterFactory(filterValue,typeFilter);
    const filterCardDOM = filterModel.getFilterCardDOM();

    sectionActiveFilters.appendChild(filterCardDOM)
    
    const icon_delete = document.getElementsByClassName('fa-circle-xmark')
    for (let index = 0; index < icon_delete.length; index++) {
        const element = icon_delete[index];
        element.addEventListener('click', deleteFilter)
    }
    updateRecipes()
}
//function to delete filter
function deleteFilter(e){
    filter = document.getElementById(e.target.parentNode.id)
    sectionActiveFilters.removeChild(filter)

    const filterRemoved = e.target.parentNode
    const filterName = filterRemoved.getAttribute("id")
    const filterType = filterRemoved.getAttribute('class').split(" ")[0]
    const menuList = document.getElementById('dropdown-menu-list-'+filterType)
    //display the removed filter
    for (let index = 0; index < menuList.children.length; index++) {
        const element = menuList.children[index];
        if(element.innerHTML == filterName){
            element.style.display = "flex"
        }
    }
    updateRecipes()
}

// function to udpate dropdown with input dropdown value
function updateDropdown(e){
    const dropdown = e.target.closest('.dropdown')
    const dropDownType = dropdown.getAttribute('id').split("-")[1]
    console.log("updateDropdown")
    let listItems = []
    switch(dropDownType){
        case "ingredients":
            listItems = getAllIngredients(recipes)
            break;
        case "ustensils":
            listItems = getAllUstensils(recipes)
            break;
        case "appliance":
            listItems = getAllAppliances(recipes)
            break;
    }
    const newListItems = []
    const valueInput = document.getElementById("input-dropdown-"+dropDownType).value
    //push items match with input in new Array
    listItems.forEach(element => {
        const index = element.toLowerCase().indexOf(valueInput.toLowerCase())
        if(index > -1){
            newListItems.push(element)
        }
    });
    updateList(newListItems,dropDownType)
    
}
//function to update recipes
function updateRecipes(){
    const activeFilters = document.getElementById('active-filters')
    const activeFiltersItems = activeFilters.children
    const valueInputSearch = inputSearchProduct.value.trim()

    let listTagIngredients = []
    let listTagAppliance = []
    let listTagUstensils = []
    let newListRecipes = []

    for (let index = 0; index < activeFiltersItems.length; index++) {
        const element = activeFiltersItems[index];
        const typeTag = element.getAttribute("class").split(' ')[0]

        switch(typeTag){
            case "ingredients":
                listTagIngredients.push(element.getAttribute('id'))
                break;
            case "ustensils":
                listTagUstensils.push(element.getAttribute('id'))
                break;
            case "appliance":
                listTagAppliance.push(element.getAttribute('id'))
                break;
        }
    }

    recipes.forEach(recipe => {
        const ingredientsRecipe = recipe.ingredients.map((ingredient)=>ingredient.ingredient)
        const applianceRecipe = recipe.appliance
        const ustensilsRecipe = recipe.ustensils

        let tagsApplicanceIsInRecipe = true
        let tagsIngredientsIsInRecipe = true
        let tagsUstensilsIsInRecipe = true

        if(listTagIngredients.length>0){
            // listTagIngredients.forEach(tagIngredient => {
            //     if(!ingredientsRecipe.includes(tagIngredient)){
            //         tagsIsInRecipe = false
            //     }
            // });
            tagsIngredientsIsInRecipe = listTagIngredients.every((tagIngredient)=>{
                return ingredientsRecipe.includes(tagIngredient)
            })
        }

        if(listTagUstensils.length>0){
            tagsUstensilsIsInRecipe = listTagUstensils.every((tagUstensil)=>{
                return ustensilsRecipe.includes(tagUstensil)
            })
        }

        if(listTagAppliance.length>0){
            tagsApplicanceIsInRecipe = listTagAppliance.every((tagApplance)=>{
                return applianceRecipe.includes(tagApplance)
            })
        }

        if(tagsApplicanceIsInRecipe && tagsIngredientsIsInRecipe && tagsUstensilsIsInRecipe){
            newListRecipes.push(recipe)
        }
    });

    if(valueInputSearch.length>2){
        newListRecipes = findRecipeWithInput(newListRecipes)
    }
    displayRecipes(newListRecipes)
}
//function to update list items of dropdown
function updateList(newListItems,dropDownType){
    // console.log(dropDownType)
    const menuList = document.getElementById('dropdown-menu-list-'+dropDownType)
    menuList.innerHTML = ""

    newListItems.forEach(element => {
        const item = document.createElement("li")
        item.setAttribute('class','list-item')
        item.setAttribute('aria-label','item-'+dropDownType)
        item.innerHTML = element
        item.addEventListener("click",addFilter)
        menuList.appendChild(item)
    });
}
// function to find recipes that match with input value
function findRecipeWithInput(recipeList) {
    const valueInputSearch = inputSearchProduct.value.trim()
    let newListRecipesWithInput = []

    recipeList.forEach(newRecipe => {
        const ingredientsRecipe = newRecipe.ingredients.map((ingredient)=>ingredient.ingredient);
        const applianceRecipe = newRecipe.appliance;
        const ustensilsRecipe = newRecipe.ustensils;

        let valueInputIsInRecipe = false;
        const nameRecipe = newRecipe.name;

        ingredientsRecipe.forEach(ingredient => {
            const indexIngredient = ingredient.toLowerCase().indexOf(valueInputSearch.toLowerCase());
            if(indexIngredient > -1){
                valueInputIsInRecipe = true;
            }
        });
        ustensilsRecipe.forEach(ustensil => {
            const indexUstensil = ustensil.toLowerCase().indexOf(valueInputSearch.toLowerCase());
            if(indexUstensil > -1){
                valueInputIsInRecipe = true;
            }
        });
        const indexAppliance = applianceRecipe.toLowerCase().indexOf(valueInputSearch.toLowerCase());
        if(indexAppliance > -1){
            valueInputIsInRecipe = true;
        }

        const indexRecipeName = nameRecipe.toLowerCase().indexOf(valueInputSearch.toLowerCase());

        if(indexRecipeName > -1){
            valueInputIsInRecipe = true;
        }

        if(valueInputIsInRecipe){
            newListRecipesWithInput.push(newRecipe);
        }
    });
    
    return newListRecipesWithInput
}

async function init() {
    displayDropdown()
    displayRecipes(recipes)
};

init();

const inputSearchProduct = document.getElementById("search-product")
const inputDropdownIngredient = document.getElementById("input-dropdown-ingredients")
const inputDropdownUstensils = document.getElementById("input-dropdown-ustensils")
const inputDropdownAppliance = document.getElementById('input-dropdown-appliance')

const dropdownIngredient = document.getElementById("dropdown-ingredients")
const dropdownUstensils = document.getElementById("dropdown-ustensils")
const dropdownAppliance = document.getElementById("dropdown-appliance")

const sectionActiveFilters = document.getElementById('active-filters')
//add event listener on click on button to display dropdown
dropdownIngredient.addEventListener("click",changeDropdown)
dropdownUstensils.addEventListener("click",changeDropdown)
dropdownAppliance.addEventListener("click",changeDropdown)
//add event listener on keyup for udpate items list
inputSearchProduct.addEventListener("keyup",updateRecipes)
inputDropdownIngredient.addEventListener("keyup",updateDropdown)
inputDropdownUstensils.addEventListener("keyup",updateDropdown)
inputDropdownAppliance.addEventListener("keyup",updateDropdown)
//add event listener on keydown for udpate items list
inputSearchProduct.addEventListener("keydown",updateRecipes)
inputDropdownIngredient.addEventListener("keydown",updateDropdown)
inputDropdownUstensils.addEventListener("keydown",updateDropdown)
inputDropdownAppliance.addEventListener("keydown",updateDropdown)
//add event listener on click on item
const itemsMenu = document.getElementsByClassName("list-item")
for (let index = 0; index < itemsMenu.length; index++) {
    const element = itemsMenu[index];
    element.addEventListener("click",addFilter)
}
//function on click on dropdown for display list
function changeDropdown(e){
    const targetClick = e.target
    const ariaLabel = targetClick.getAttribute('aria-label')
    const typeDropdown = ariaLabel.split('-')[1]
    const dropdown = document.getElementById("dropdown-"+typeDropdown)
    const input = dropdown.children[0]
    const arrow = dropdown.children[1].children[0]
    const menu = dropdown.children[2]
    if(input.getAttribute('type') == "button"){
        //change attribute of input
        input.setAttribute('value',"")
        input.setAttribute('type','text')
        input.focus()
        //display menu
        menu.setAttribute('class',"dropdown-menu d-flex menu-active")
        //set class for dropdown
        dropdown.setAttribute('class','dropdown dropdown-active')
        //change direction arrow 
        arrow.setAttribute('class', "fa-solid fa-angle-down rotate")
    }else{
        //change attribute of input
        input.setAttribute('type','button')
        input.setAttribute('value',input.getAttribute('name'))
        //display none menu
        menu.setAttribute('class',"dropdown-menu d-none")
        //set class for dropdown
        dropdown.setAttribute('class','dropdown')
        //change direction arrow 
        arrow.setAttribute('class', "fa-solid fa-angle-down")
    }
}