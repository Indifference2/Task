const tablePercentage = obtainReferenceTagById("#tablePercentage")
const tableUpcomingEvents = obtainReferenceTagById("#tableUpcomingEvents")
const tablePastEvents = obtainReferenceTagById("#tablePastEvents")


fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then(response => response.json())
.then(dataEvents =>{
    console.log(dataEvents)
    const currentDate = getCurrentDate(dataEvents)
    const eventsPastEvents = filterPastEvents(dataEvents.events, currentDate)

    eventsPastEvents.capacity

    eventsPastEvents.reduce(acc, currentValue, currentIndex =>{
        acc = percentageEvent(currentValue)
        
    },0)

    // const orderPastEventsDescedent = orderEventsByProperty(eventsPastEvents, "assistance", "descendent")
    console.log(eventsPastEvents)
    // const orderEventByAssistanceDescendent = orderEventsByProperty(eventAssistance, "assistance", "descendent")
    
    // assignEvent(top10EventsByAssistance, tablePercentage, createEventTablePercentage)
    

    // const arrayTr = Array.from([tablePercentage][0].childNodes)
    // console.log(arrayTr)
})



function percentageEvent(event){
    return ((event.assistance * 100) / event.capacity)
}
function obtainReferenceTagById(id){
    // ID as String
    return document.getElementById(id)
}

function orderEventsByProperty(events, nameProp, order="ascendent"){
    // order is a optional parameter, by default is ascendent
    if (order === "descendent"){
        return events.sort((a, b) => b[nameProp] - a[nameProp])
    }return events.sort ((a, b) => a[nameProp] - b[nameProp])
}

function getCurrentDate (event){
    return event.currentDate
}

function filterPastEvents(event, currentDate){
    return event.filter(item => item.date < currentDate)
}

function obtainTopEvent (events){
    return events.slice(0,1)
}

function createEventTablePercentage(event){
    return `<tr>
                <td>d</td>            
                <td>d</td>            
                <td>d</td>            
            </tr>`
}

function assignEvent(events, element, template){
    let templateTableData = "";
    for (let item of events){
            templateTableData += template(item)
            }element.innerHTML = templateTableData
    }

function filterEventsAssistance (events){
    return events.filter(item => item.assistance)
}



