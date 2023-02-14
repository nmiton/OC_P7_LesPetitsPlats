async function displayData(recipes) {
    const recipesSection = document.getElementById('recipes-list')

    recipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        recipesSection.appendChild(recipeCardDOM);
    });
};

function findAllIngredients(recipes){
    const ingredientsList = []
    const select = document.getElementById('ingredients')
    recipes.forEach(recipe => {
        const ingredientsRecipe = recipe.ingredients
        ingredientsRecipe.forEach(ingredient => {
            const ingredientName = ingredient.ingredient
            if(!ingredientsList.includes(ingredientName)){
                ingredientsList.push(ingredientName)
            }
        });
    });

    updateSelect(select,ingredientsList)
}

function findAllAppliances(recipes){
    const appliancesList = []
    const select = document.getElementById('appliance')
    recipes.forEach(recipe => {
        const appliance = recipe.appliance
        if(!appliancesList.includes(appliance)){
            appliancesList.push(appliance)
        }
    });

    updateSelect(select,appliancesList)
}

function findAllUstensils(recipes){
    const ustensilsList = []
    const select = document.getElementById('ustensils')
    recipes.forEach(recipe => {
        const ustensils = recipe.ustensils
        ustensils.forEach(element => {
            if(!ustensilsList.includes(element)){
                ustensilsList.push(element)
            }
        });
    });
    updateSelect(select,ustensilsList)
}

function updateSelect(select,options){
    options.forEach(option => {
        const opt = document.createElement('option')
        opt.setAttribute('value', option)
        opt.innerText = option
        select.appendChild(opt)
    });
}

const selectIngredient = document.getElementById("ingredients")
const selectUstensils = document.getElementById("ustensils")
const selectAppliance = document.getElementById('appliance')
const sectionActiveFilters = document.getElementById('active-filters')
//Event listener
selectIngredient.addEventListener("change",addFilter)
selectUstensils.addEventListener("change",addFilter)
selectAppliance.addEventListener("change",addFilter)



function addFilter(e){
    filter = e.target.value
    if(filter === "Ingrédients" || filter === "Appareils" || filter === "Ustensiles"){
        return
    }
    type = e.target.id
    const filterModel = filterFactory(filter,type);
    const filterCardDOM = filterModel.getFilterCardDOM();

    sectionActiveFilters.appendChild(filterCardDOM)

    const select = e.target
    const selectOptions = select.options
    for (let index = 0; index < selectOptions.length; index++) {
        const element = selectOptions[index];
        if(element.value == filter){
            select.removeChild(element)
        }
    }

    const icon_delete = document.getElementsByClassName('fa-circle-xmark')
    for (let index = 0; index < icon_delete.length; index++) {
        const element = icon_delete[index];
        element.addEventListener('click', deleteFilter)
    }
}

function deleteFilter(e){
    filter = document.getElementById(e.target.parentNode.id)
    sectionActiveFilters.removeChild(filter)
}

async function init() {
    displayData(recipes)
    findAllIngredients(recipes)
    findAllAppliances(recipes)
    findAllUstensils(recipes)
};

init();
    
