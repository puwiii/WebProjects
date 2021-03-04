
let countries = document.getElementById('countries')
let input = document.getElementById('input')
let searchIcon = document.getElementById('searchIcon')
let select = document.getElementById('select')
let container = document.createElement("div")
let darkButton = document.getElementById('darkButton')
let content = document.getElementById('content')

if(localStorage.getItem('darkMode')){
    content.classList.add('darkMode')
    document.body.classList.add('darkMode')
}
else{
    content.classList.remove('darkMode')
    document.body.classList.remove('darkMode')
}

darkButton.addEventListener('click', ()=>{
    content.classList.toggle('darkMode')
    document.body.classList.toggle('darkMode')

    if(content.classList.contains('darkMode')){
        localStorage.setItem('darkMode', true)
    }
    else{
        localStorage.setItem('darkMode', false)
    }
})

let countriesOnScreen
container.classList.add('container')


getAllCountries()

searchIcon.addEventListener('click',()=>{
    getCountriesByName(input.value)
})

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
    input.value=''
    fetch('https://restcountries.eu/rest/v2/region/'+region)
    .then(data=>data.json())
    .then(data=>{
        console.log('data buscada por region' +data)
        countriesOnScreen = data
        data.map(function(country){
            buildCountry(country.alpha3Code, country.flag, country.name, country.population, country.region, country.capital)
        })
    })
}

function getCountriesByName(name){
    container.innerHTML=""
    var countriesByName = 
    countriesOnScreen.filter(function(country){
        return country.name.toLowerCase().includes(name.toLowerCase())
    })
    .map(function(country){
        buildCountry(country.alpha3Code, country.flag, country.name, country.population, country.region, country.capital)
    })
    
}

function getAllCountries(){
    container.innerHTML=""
    fetch('https://restcountries.eu/rest/v2/all')
    .then(data=> data.json())
    .then(data=>{
        countriesOnScreen = data
        data.map(function(country){
            console.log(country)
            buildCountry(country.alpha3Code, country.flag, country.name, country.population, country.region, country.capital)
        })
    })
}

function buildCountry(code ,urlImage, name, population, region, capital){



    let countryDiv = document.createElement("a")
        countryDiv.href = "country.html?code="+code
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

    countries.appendChild(container)

}