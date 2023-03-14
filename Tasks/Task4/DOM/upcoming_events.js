
const containerCards = document.getElementById("#containerAllCards")
const containerCategory = document.getElementById("#containerCategory")
const inputSearch = document.getElementById("#form_search")


fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then(response => response.json())
.then(dataEvents =>{
    const currentDate = dataEvents.currentDate
    const upComingEvents = dataEvents.events.filter(item => item.date > currentDate)
    const allCategoriesNoRepeat = obtainCategoriesNoRepeat(upComingEvents)

    assignCategories(allCategoriesNoRepeat, containerCategory)
    assignCard(upComingEvents, containerCards)
    
    containerCategory.addEventListener('click',() => {
        const crossFilter = filterEventsByValuesSearchAndCheckbox(upComingEvents)
        if (crossFilter == 0){
            messageEventisNotFound()
        }else{
            assignCard(crossFilter,containerCards)
        }
    })
    
    inputSearch.addEventListener('input', () =>{
        const crossFilter = filterEventsByValuesSearchAndCheckbox(upComingEvents)
        if (crossFilter == 0){
            messageEventisNotFound()
        }else{
            assignCard(crossFilter,containerCards)
        }
    })

    }
)
    .catch(error => console.log(error))

function createCard (event){
    return `<div class="card text-bg-secondary" style="width: 18rem; height:23rem;">
        <img src=${event.image} class="card-img-top img_card_height" alt="concierto_musical">
        <div class="card-body d-flex flex-column align-content-between justify-content-between">
            <h5 class="card-title">${event.name}</h5>
            <p>${event.description}</p>
            <div class="d-flex justify-content-between align-items-center">
                <p class="card-text price">Price: $${event.price}</p>
                <a href="../pages/details.html?id=${event._id}" class="btn btn-dark">More info</a>
            </div>
        </div>
    </div>`
}

function assignCard(events, element){
    let templateCard = ''
    for (item of events){
        templateCard += createCard(item)
    }
    element.innerHTML = templateCard 
}

function createCategory (eventCategory){
    return`<div class="category p-md-1 height_box_category">
            <input class="form-check-input" type="checkbox" value="${eventCategory}" id="checkbox_categories">
            <label class="form-check-label" for="checkbox_categories">${eventCategory}</label>
            </div>`

}

function assignCategories(events, element){
    let templateCategory = "";
    for (let category of events){
        templateCategory += createCategory(category)
    }
    element.innerHTML = templateCategory;
}

function obtainCategoriesNoRepeat(events){
    const allCategories = events.map(item => item.category)
    return allCategories.filter((item, index) => allCategories.indexOf(item) === index)
}

function isValueInEventCategory(event, value){
    return value.includes(event.category)
}

function filterEventByValueCheckBox(events){
    const inputCheckBoxs = Array.from(document.querySelectorAll('.form-check-input'))
    const checkBoxsChecked = inputCheckBoxs.filter(item => item.checked)
    const valuesCheckboxChecked = checkBoxsChecked.map(item => item.value)
    if (valuesCheckboxChecked == 0){
        return events
    }
    return events.filter((item) =>{
        return isValueInEventCategory(item, valuesCheckboxChecked)
    }) 
}

function isValueInEventName(event, value){
    return event.name.toLowerCase().includes(value)
}

function filterEventByValueSearch(event){
    const valueInputSearch = inputSearch.value.toLowerCase()
    if (valueInputSearch == 0){
        return event
    }
    return event.filter(item => isValueInEventName(item, valueSearch))
}

function filterEventsByValuesSearchAndCheckbox(event){
    return filterEventByValueCheckBox(filterEventByValueSearch(event))
}

function messageEventisNotFound(){
    return containerCards.innerHTML = "<h2>Sorry, the event is not found, check your filters </h2>"
}