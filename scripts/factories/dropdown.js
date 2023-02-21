function dropdownFactory(type) {
    function getDropDownCardDOM() {

        const dropdown = document.createElement('div');
        dropdown.setAttribute('class', "dropdown")
        dropdown.setAttribute('id', "dropdown-" + type)
        
        const input = document.createElement('input');
        input.setAttribute("class","input-dropdown")
        input.setAttribute("id","input-dropdown-" + type)
        input.setAttribute("type","button")

        switch (type) {
            case "ingredients":
                input.setAttribute("placeholder","Rechercher un ingrédient")
                input.setAttribute("value","Ingrédients")
                input.setAttribute("name","Ingrédients")
                break;
            case "ustensils":
                input.setAttribute("placeholder","Rechercher un ustensil")
                input.setAttribute("value","Ustensils")
                input.setAttribute("name","Ustensils")
                break;
            case "appliance":
                input.setAttribute("placeholder","Rechercher un appareil")
                input.setAttribute("value","Appareils")
                input.setAttribute("name","Appareils")
                break;
            default:
                break;
        }

        const label = document.createElement('label');
        label.setAttribute("class","label-dropdown")

        const arrowDown = document.createElement('i')
        arrowDown.setAttribute('id','arrow-'+type)
        arrowDown.setAttribute('class','fa-solid fa-angle-down')

        label.appendChild(arrowDown)

        const menu = document.createElement("div")
        menu.setAttribute('class',"dropdown-menu d-none")
        menu.setAttribute('id',"dropdown-menu-"+type)
        menu.setAttribute('aria-labelledby',"dropdown-menu")

        const list = document.createElement("ul")
        list.setAttribute('class',"dropdown-menu-list")
        list.setAttribute('id',"dropdown-menu-list-"+type)
        list.setAttribute('aria-label', "list-"+type)
        menu.appendChild(list)

        dropdown.appendChild(input)
        dropdown.appendChild(label)
        dropdown.appendChild(menu)

        return dropdown
    }

    return { getDropDownCardDOM }
}