const infoEvents = data.events;
const containerPastEvents = document.getElementById("containerAllCardsPastEvents")

function filterPastEvents(array){
    const pastEvents = []
    for (let item of array){
        if (item.date < data.currentDate){
            pastEvents.push(array.indexOf(item))
        }
    }return pastEvents
}

function createCard (list){
    return `
    <div class="card text-bg-secondary" style="width: 18rem; height:23rem;">
        <img src=${list.image} class="card-img-top img_card_height" alt="concierto_musical">
        <div class="card-body d-flex flex-column align-content-between justify-content-between">
            <h5 class="card-title">${list.name}</h5>
            <p>${list.description}</p>
            <div class="d-flex justify-content-between align-items-center">
                <p class="card-text price">Price: $${list.price}</p>
                <a href="./details.html" class="btn btn-dark">More info</a>
            </div>
        </div>
    </div>`
}

function assignCardPastEvent(arrayPastEvents, element){
    let templateCard = "";
    for (index of arrayPastEvents){
        templateCard += createCard(infoEvents[index])
    }
    element.innerHTML = templateCard
}

assignCardPastEvent(filterPastEvents(infoEvents), containerPastEvents)