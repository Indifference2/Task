const dataEvents = data
const containerDetailCard = document.getElementById("containerCardDetail")
const params = new URLSearchParams(location.search)
const id = params.get("id")

const eventId = filterEventById(dataEvents.events, id)
    assignCard(eventId, containerDetailCard)

function createCard (infoCard){
    return `<div class="card bg-light p-1 mb-4 mt-4" style="width: 50rem;">
                <img src="${infoCard.image}" class="card-img-top" alt="${infoCard.name}">
                <div class="card-body">
                    <h5 class="card-title">${infoCard.name}</h5>
                    <p class="card-text">${infoCard.description}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item list-group-item-light">Place: ${infoCard.place}</li>
                <li class="list-group-item list-group-item-light">Capacity: ${infoCard.capacity ? infoCard.capacity : "No value associated"}</li>
                <li class="list-group-item list-group-item-light">Assistance: ${infoCard.assistance ? infoCard.assistance : "No value associated"}</li>
                <li class="list-group-item list-group-item-light">Estimate: ${infoCard.estimate ? infoCard.estimate : "No value associated" }</li>
                <li class="list-group-item list-group-item-light">Price: $ ${infoCard.price}</li>
            </ul>
            </div>`
}

function assignCard(event, element){
    let template = "";
    for (item of event){
        template += createCard(item)
    }
    element.innerHTML = template
}

function filterEventById(event, id){
    return event.filter(item => item._id == id)
}