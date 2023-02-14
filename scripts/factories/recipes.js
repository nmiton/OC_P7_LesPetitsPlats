function recipeFactory(data) {
    const { id, name, servings, ingredients, time, description, appliance, ustensils } = data;

    function getRecipeCardDOM() {
        const figure = document.createElement('figure');
        figure.setAttribute('class','recipe')

        const imgRecipe = document.createElement('div')
        imgRecipe.setAttribute('class', "img-recipe")

        const nameRecipe = document.createElement("p")
        nameRecipe.setAttribute('class',"name-recipe")
        nameRecipe.textContent = name

        const div_time = document.createElement("div")
        div_time.setAttribute('class', "time-wrapper")

        const icon_time = document.createElement('i')
        icon_time.setAttribute('class',"icon-time")
        icon_time.setAttribute('class',"fa-regular fa-clock")

        const timeRecipe = document.createElement('p')
        timeRecipe.setAttribute('class', 'time')
        timeRecipe.textContent = time + " min"

        div_time.appendChild(icon_time)
        div_time.appendChild(timeRecipe)

        const div_top = document.createElement('div')
        div_top.setAttribute('class','top-recipe')

        div_top.appendChild(nameRecipe)
        div_top.appendChild(div_time)


        const descriptionRecipe = document.createElement('p')
        descriptionRecipe.setAttribute('class',"description")
        if(description.length<200){
            descriptionRecipe.textContent = description
        }else{
            descriptionRecipe.textContent = description.slice(0,200)+"..."
        }

        const ingredientsRecipe = document.createElement('ul')
        ingredientsRecipe.setAttribute('class',"ingredients-list")
        ingredients.forEach(item => {
            const ingredient = item.ingredient
            const quantity = item.quantity
            const unit = item.unit

            const item_list = document.createElement("li")
            item_list.setAttribute('class','ingredient')

            const ingredient_span = document.createElement("span")
            ingredient_span.setAttribute('class', "ingredient-name")
            ingredient_span.innerHTML = ingredient

            item_list.appendChild(ingredient_span)

            if(typeof quantity != 'undefined'){
                const quantity_span = document.createElement("span")
                quantity_span.setAttribute('class', "ingredient-quantity")
                quantity_span.innerHTML = ": "+quantity
                item_list.appendChild(quantity_span)
            }
            if(typeof unit != 'undefined'){
                let newUnit = unit
                if(unit == "grammes"){
                    newUnit = "g"
                }
                nb_words = newUnit.split(' ')
                
                if(nb_words.length>1){
                    newUnit = nb_words[0]
                    const unit_span = document.createElement("span")
                        unit_span.setAttribute('class', "ingredient-unit")
                        unit_span.innerHTML = " "+newUnit
                        item_list.appendChild(unit_span)
                }else{
                    if(newUnit.length < 3){
                        const unit_span = document.createElement("span")
                        unit_span.setAttribute('class', "ingredient-unit")
                        unit_span.innerHTML = newUnit
                        item_list.appendChild(unit_span)
    
                    }else{
                        const unit_span = document.createElement("span")
                        unit_span.setAttribute('class', "ingredient-unit")
                        unit_span.innerHTML =" "+newUnit
                        item_list.appendChild(unit_span)
                    }
                }
            }

            ingredientsRecipe.appendChild(item_list)
        });

        const div_bottom = document.createElement('div')
        div_bottom.setAttribute('class','bottom-recipe')

        div_bottom.appendChild(ingredientsRecipe)
        div_bottom.appendChild(descriptionRecipe)


        figure.appendChild(imgRecipe)
        figure.appendChild(div_top)
        figure.appendChild(div_bottom)

        return (figure)
    }

    return { getRecipeCardDOM }
}