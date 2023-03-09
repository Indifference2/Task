const infoEvents = data.events;
const containerPastEvents = document.getElementById("containerAllCardsPastEvents")
const filterPastEvents = infoEvents.filter(item => item.date < data.currentDate)

function createCard (event){
    return `
    <div class="card text-bg-secondary" style="width: 18rem; height:23rem;">
        <img src=${event.image} class="card-img-top img_card_height" alt="concierto_musical">
        <div class="card-body d-flex flex-column align-content-between justify-content-between">
            <h5 class="card-title">${event.name}</h5>
            <p>${event.description}</p>
            <div class="d-flex justify-content-between align-items-center">
                <p class="card-text price">Price: $${event.price}</p>
                <a href="./details.html?id=${event._id}" class="btn btn-dark">More info</a>
            </div>
        </div>
    </div>`
}

function assignCard(arrayPastEvents, element){
    let templateCard = ''
    arrayPastEvents.forEach( info => templateCard += createCard(info))

    element.innerHTML = templateCard 
}

assignCard(filterPastEvents, containerPastEvents)

const containerCategory = document.getElementById("#containerCategory")

const ObtainAllCategory = (dataEvents) => dataEvents.map(item => item.category)

const allCategory =  ObtainAllCategory(filterPastEvents)

const allCategoryNoRepeat = allCategory.filter((category, index) => allCategory.indexOf(category) === index)

const createCategory = (eventsCategory) => 
`<div class="category p-md-1 height_box_category">
    <input class="form-check-input" type="checkbox" value="${eventsCategory}" id="checkbox_categories">
    <label class="form-check-label" for="checkbox_categories">${eventsCategory}</label>
</div>
`

function assignCategory(eventsArray, element){
    let templateCategory = "";
    for (let category of eventsArray){
        templateCategory += createCategory(category)
    }
    element.innerHTML = templateCategory;
}

assignCategory(allCategoryNoRepeat, containerCategory)

const inputCheckBoxNodeList = document.querySelectorAll('.form-check-input')
const arrayCheckBox = Array.from(inputCheckBoxNodeList)

containerCategory.addEventListener('click',(e) => {
    assignCard(filterSearchCategory(), containerPastEvents)
})

function filterCategory(dataEvents){
    const checkStatusCheckBox = arrayCheckBox.filter(checkbox => checkbox.checked)
    const checkBoxValues = checkStatusCheckBox.map(checkbox => checkbox.value)

    if (checkStatusCheckBox == 0){
        return dataEvents
    }else{
        return dataEvents.filter(item =>{
            return (checkBoxValues.includes(item.category))
        }) 
    }
}
const form = document.querySelector("form")
const inputFormSearch = form[0]

inputFormSearch.addEventListener('input', (e) =>{
    assignCard(filterSearchCategory(), containerPastEvents)
})

function filterSearch(dataEvents){
    const wordInputSearch = inputFormSearch.value.toLowerCase()
    if (wordInputSearch === 0){
        return dataEvents
    }else{
        return(filterPastEvents.filter(item => item.name.toLowerCase().includes(wordInputSearch))) 
    }
}


function filterSearchCategory(){
    return filterCategory(filterSearch(filterPastEvents), containerPastEvents)
} 