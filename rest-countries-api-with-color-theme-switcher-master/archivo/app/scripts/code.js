
let countries = document.getElementById('countries')
let input = document.getElementById('input')
let select = document.getElementById('select')
let container = document.createElement("div")
let countriesOnScreen
container.classList.add('container')

getAllCountries()

input.addEventListener('keyup',(e)=>{
    if (e.keyCode === 13) {
        // Cancel the default action, if needed
        e.preventDefault();
        // Trigger the button element with a click
        getCountriesByName(input.value)
    }
})

select.onchange= function() {
    let region = select.value
    if (region!=='all'){
        getCountriesByRegion(region)
    }
    else{
        getAllCountries()
    }
}

function getCountriesByRegion(region){
    container.innerHTML=""
    fetch('https://restcountries.eu/rest/v2/region/'+region)
    .then(data=>data.json())
    .then(data=>{
        console.log('data buscada por region' +data)
        countriesOnScreen = data
        data.map(function(country){
            buildCountry(country.flag, country.name, country.population, country.region, country.capital)
        })
    })
}

function getCountriesByName(name){
    container.innerHTML=""
    var countriesByName = 
    countriesOnScreen.filter(function(country){
        return country.name.toLowerCase().includes(name)
    })
    .map(function(country){
        buildCountry(country.flag, country.name, country.population, country.region, country.capital)
    })
    
}

function getAllCountries(){
    container.innerHTML=""
    fetch('https://restcountries.eu/rest/v2/all')
    .then(data=> data.json())
    .then(data=>{
        countriesOnScreen = data
        data.map(function(country){
            buildCountry(country.flag, country.name, country.population, country.region, country.capital)
        })
    })
}

function buildCountry(urlImage, name, population, region, capital){

    let fragment = new DocumentFragment();

    let countryDiv = document.createElement("div")
        countryDiv.classList.add('countries__country')
            
    let countryFlag = document.createElement("div")
        countryFlag.classList.add('countries__country-flag')
        countryFlag.style.backgroundImage = "url('" + urlImage + "')"

    let countryName = document.createElement("p")
        countryName.classList.add('countries__country-name')
        countryName.innerText = name

    let countryPopulation = document.createElement("p")
        countryPopulation.classList.add('countries__country-population')
        countryPopulation.innerHTML = "Population: <span>"+ population + "</span>"

    let countryRegion = document.createElement("p")
        countryRegion.classList.add('countries__country-region')
        countryRegion.innerHTML = "Region: <span>"+ region + "</span>"

    let countryCapital = document.createElement("p")
        countryCapital.classList.add('countries__country-capital')
        countryCapital.innerHTML = "Capital: <span>"+ capital + "</span>"

    container.appendChild(countryDiv)
    countryDiv.appendChild(countryFlag)
    countryDiv.appendChild(countryName)
    countryDiv.appendChild(countryPopulation)
    countryDiv.appendChild(countryRegion)
    countryDiv.appendChild(countryCapital)

    container.appendChild(fragment)
    countries.appendChild(container)

}