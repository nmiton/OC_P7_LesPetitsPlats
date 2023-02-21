// function to display receipes
async function displayData(recipes) {
    const recipesSection = document.getElementById('recipes-list')

    recipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        recipesSection.appendChild(recipeCardDOM);
    });
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
//function to add all ingredients to dropdown
function findAllIngredients(recipes){
    const ingredientsList = []
    const menuList = document.getElementById('dropdown-menu-list-ingredients')
    recipes.forEach(recipe => {
        const ingredientsRecipe = recipe.ingredients
        ingredientsRecipe.forEach(ingredient => {
            const ingredientName = ingredient.ingredient
            if(!ingredientsList.includes(ingredientName)){
                ingredientsList.push(ingredientName)
                const item = document.createElement('li')
                item.setAttribute("class","list-item")
                item.innerHTML = ingredientName
                menuList.appendChild(item)
            }
        });
    });
}
//function to add all appliances to dropdown
function findAllAppliances(recipes){
    const appliancesList = []
    const menuList = document.getElementById('dropdown-menu-list-appliance')
    recipes.forEach(recipe => {
        const appliance = recipe.appliance
        if(!appliancesList.includes(appliance)){
            appliancesList.push(appliance)
            const item = document.createElement('li')
            item.setAttribute("class","list-item")
            item.innerHTML = appliance
            menuList.appendChild(item)
        }
    });
}
//function to add all ustensils to dropdown
function findAllUstensils(recipes){
    const ustensilsList = []
    const menuList = document.getElementById('dropdown-menu-list-ustensils')
    recipes.forEach(recipe => {
        const ustensils = recipe.ustensils

        ustensils.forEach(element => {
            if(!ustensilsList.includes(element)){
                ustensilsList.push(element)
                const item = document.createElement('li')
                item.setAttribute("class","list-item")
                item.innerHTML = element
                menuList.appendChild(item)
            }
        });
    });
}
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
}
// function to udpate dropdown with input dropdown value
function updateDropdown(e){
    if(e.target.value.length===0){
        return
    }else{
        const dropDownType = e.target.parentNode.getAttribute('id').split("-")[1]
        const list = e.target.parentNode.children[2].children[0]
        const items = list.children
        const oldListItems = []
        //get all items of list
        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            oldListItems.push(element.innerHTML)
        }
        const newListItems = []
        const valueInput = e.target.value
        //push items match with input in new Array
        oldListItems.forEach(element => {
            const index = element.toLowerCase().indexOf(valueInput.toLowerCase())
            if(index > -1){
                newListItems.push(element)
            }
        });
        
        updateList(newListItems,dropDownType)
    }
}
//function to update list items of dropdown
function updateList(newListItems,dropDownType){
    const menuList = document.getElementById('dropdown-menu-list-'+dropDownType)
    menuList.innerHTML = ""

    newListItems.forEach(element => {
        const item = document.createElement("li")
        item.setAttribute('class','list-item')
        item.innerHTML = element
        item.addEventListener("click",addFilter)
        menuList.appendChild(item)
    });
}

async function init() {
    displayData(recipes)
    displayDropdown()
    findAllIngredients(recipes)
    findAllAppliances(recipes)
    findAllUstensils(recipes)
};

init();
    
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
inputDropdownIngredient.addEventListener("keyup",updateDropdown)
inputDropdownUstensils.addEventListener("keyup",updateDropdown)
inputDropdownAppliance.addEventListener("keyup",updateDropdown)
//add event listener on keydown for udpate items list
inputDropdownIngredient.addEventListener("keydown",updateDropdown)
inputDropdownUstensils.addEventListener("keydown",updateDropdown)
inputDropdownAppliance.addEventListener("keydown",updateDropdown)
//add event listener on focusout for update dropdown with all items
inputDropdownIngredient.addEventListener("focusout",findAllIngredients)
inputDropdownUstensils.addEventListener("focusout",findAllAppliances)
inputDropdownAppliance.addEventListener("focusout",findAllUstensils)
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
    console.log(ariaLabel)
    const typeDropdown = ariaLabel.split('-')[1]
    const dropdown = document.getElementById("dropdown-"+typeDropdown)
    const input = dropdown.children[0]
    const arrow = dropdown.children[1].children[0]
    const menu = dropdown.children[2]
    if(input.getAttribute('type') == "button"){
        //change attribute of input
        input.setAttribute('value',"")
        input.setAttribute('type','text')
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