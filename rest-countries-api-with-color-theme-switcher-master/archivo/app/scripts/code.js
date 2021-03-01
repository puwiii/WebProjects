
let countries = document.getElementById('countries')

let fragment = new DocumentFragment();

let container = document.createElement("div")
    container.classList.add('container')

fetch('https://restcountries.eu/rest/v2/all')
    .then(data=> data.json())
    .then(data=>{
        data.map(function(country){
            buildCountry(country.flag, country.name, country.population, country.region, country.capital)
        })
    })

function buildCountry(urlImage, name, population, region, capital){

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

    fragment.appendChild(container)
    countries.appendChild(fragment)
}