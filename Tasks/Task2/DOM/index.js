const infoEvents = data.events
const containerAllCards = document.getElementById("containerAllCards")

function createCard (list){
    return `<div class="card text-bg-secondary" style="width: 18rem; height:23rem;">
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

function assignCard(array, element){
    let templateCard = ""

    for (let info of array){
        templateCard += createCard(info);
    }
    element.innerHTML = templateCard
    
}
    
assignCard(infoEvents, containerAllCards)