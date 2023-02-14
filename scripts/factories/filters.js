function filterFactory(value, type) {
    function getFilterCardDOM() {

        const filter = document.createElement('div');
        filter.setAttribute('class', type + ' filter-item')
        filter.setAttribute('id', value)
        filter.innerHTML = value

        const xmark = document.createElement('i')
        xmark.setAttribute('class','fa-regular fa-circle-xmark')
        filter.appendChild(xmark)
        
        return filter
    }

    return { getFilterCardDOM }
}