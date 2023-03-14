const tablePercentage = document.getElementById("#tablePercentage")
const tableUpcomingEvents = document.getElementById("#tableUpcomingEvents")
const tablePastEvents = document.getElementById("#tablePastEvents")


fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then(response => response.json())
.then(dataEvents =>{
    const currentDate = dataEvents.currentDate
    // First Table
    const pastEvents = dataEvents.events.filter(item => item.date < currentDate)
    
    const eventsWithPercentage =  pastEvents.map(item => {
        let newPastEvents = {};
        newPastEvents.name = item.name;
        newPastEvents.percentage = ((item.assistance * 100) / item.capacity).toFixed(1)
        return newPastEvents
    })
    
    const orderPastEventsCapacity = orderEventsByProperty(pastEvents, "capacity" ,"descendent")
    const orderEventByPercentage = orderEventsByProperty(eventsWithPercentage, "percentage", "descendent")
    
    const topEventPercentage = orderEventByPercentage.slice(0,1)
    const lastEventPercetange = orderEventByPercentage.slice(orderEventByPercentage.length - 1)
    const topEventCapacity = orderPastEventsCapacity.slice(0,1)
    
    let dataFirstTable = []
    dataFirstTable.push(topEventPercentage)
    dataFirstTable.push(lastEventPercetange)
    dataFirstTable.push(topEventCapacity)
    
    assignEvent(dataFirstTable.flat(1), tablePercentage, createEventTablePercentage)

    // Second Table
    
    const upcomingEvents = dataEvents.events.filter(item => item.date > currentDate)
    const allCategoriesNoRepeatUpcoming = obtainCategoriesNoRepeat(upcomingEvents)

    const upComingEventsStatsByCategory = allCategoriesNoRepeatUpcoming.map(category => {
        
        const filterupComingEventsCategory = upcomingEvents.filter(item => item.category === category)
        
        const revenue = filterupComingEventsCategory.reduce((acc, currentValue) =>{
            acc += (currentValue.estimate * currentValue.price)
            return acc
        }, 0)

        const estimateTotal = filterupComingEventsCategory.reduce((acc, currentValue) =>{
            acc += currentValue.estimate
            return acc
        }, 0)
        
        const capacityTotal = filterupComingEventsCategory.reduce((acc, currentValue) =>{
            acc += currentValue.capacity
            return acc
        }, 0)

        let newUpcomingEvents = {}
            newUpcomingEvents.category = category
            newUpcomingEvents.revenue = revenue
            newUpcomingEvents.percentage = ((estimateTotal  * 100) / capacityTotal).toFixed(1)
            return newUpcomingEvents
    })
    assignEvent(upComingEventsStatsByCategory, tableUpcomingEvents, createEventTableByCategory)

    //Third Table
    const pastEventsThirdTable = dataEvents.events.filter(item => item.date < currentDate)

    const allCategoriesNoRepeatPastEvents = obtainCategoriesNoRepeat(pastEventsThirdTable)

    const PastEventsStatsByCategory = allCategoriesNoRepeatPastEvents.map(category => {
        const filterPastEventsCategory = pastEvents.filter(item => item.category === category)
        
        const revenue = filterPastEventsCategory.reduce((acc, currentValue) =>{
            acc += (currentValue.assistance * currentValue.price)
            return acc
        }, 0)
        
        const assistanceTotal= filterPastEventsCategory.reduce((acc, currentValue) =>{
            acc += currentValue.assistance
            return acc
        }, 0)
        
        const capacityTotal = filterPastEventsCategory.reduce((acc, currentValue) =>{
            acc += currentValue.capacity
            return acc
        }, 0)

        let newPastEvents = {}
        newPastEvents.category = category
        newPastEvents.revenue = revenue
        newPastEvents.percentage = ((assistanceTotal * 100) / capacityTotal).toFixed(1)
        return newPastEvents
    })
    
    assignEvent(PastEventsStatsByCategory, tablePastEvents, createEventTableByCategory)
})


function orderEventsByProperty(events, nameProp, order="ascendent"){
    // order is a optional parameter, by default is ascendent
    if (order === "descendent"){
        return events.sort((a, b) => b[nameProp] - a[nameProp])
    }return events.sort ((a, b) => a[nameProp] - b[nameProp])
}

function obtainCategoriesNoRepeat(events){
    const allCategories = events.map(item => item.category)
    return allCategories.filter((item, index) => allCategories.indexOf(item) === index)
}

function createEventTablePercentage(event){
    return `<td>${event.name} : ${event.percentage ? event.percentage: event.capacity} </td>` 
}

function createEventTableByCategory(event){
    return `<tr>
                <td>${event.category}</td>
                <td>$${event.revenue}</td>
                <td>${event.percentage}%</td>
            </tr>`
}

function assignEvent(events, element, template){
    let templateTableData = "";
    for (let item of events){
            templateTableData += template(item)
    }element.innerHTML = templateTableData
}





