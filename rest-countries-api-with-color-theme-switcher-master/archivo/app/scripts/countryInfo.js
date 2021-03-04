
let countryCode = getParameterByName('code')
let darkButton = document.getElementById('darkButton')
let content = document.getElementById('content')

if(localStorage.getItem('darkMode')){
    content.classList.add('darkMode')
}
else{
    content.classList.remove('darkMode')
}

darkButton.addEventListener('click', ()=>{
    content.classList.toggle('darkMode')
    
    if(content.classList.contains('darkMode')){
        localStorage.setItem('darkMode', true)
    }
    else{
        localStorage.setItem('darkMode', false)
    }
})

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}



fetch('https://restcountries.eu/rest/v2/alpha/'+countryCode)
    .then(country => country.json())
    .then(country => {

        let flag = document.getElementById('flag')
        flag.style.backgroundImage = "url('"+country.flag+"')"

        let name = document.getElementById('name')
        name.innerText = country.name

        let nativeName = document.getElementById('nativeName')
        nativeName.innerText = country.nativeName

        let population = document.getElementById('population')
        population.innerText = country.population

        let region = document.getElementById('region')
        region.innerText = country.region

        let subRegion = document.getElementById('subRegion')
        subRegion.innerText = country.subregion

        let capital = document.getElementById('capital')
        capital.innerText = country.capital

        let topLevelDomain = document.getElementById('topLevelDomain')
        topLevelDomain.innerText = country.topLevelDomain.join()

        let currencies = document.getElementById('currencies')
        let currenciesList = ''

        country.currencies.map(function(currency){
            currenciesList = currenciesList + currency.name +', '
        })

        currencies.innerText = currenciesList.slice(0, -2);

        let languages = document.getElementById('languages')
        let languagesList = ''

        country.languages.map(function(language){
            languagesList = languagesList + language.name +', '
        })

        languages.innerText = languagesList.slice(0, -2);

        let borders = document.getElementById('borders')
        let fragment = new DocumentFragment()

        country.borders.map(function(borderCountryCode){
            fetch('https://restcountries.eu/rest/v2/alpha/'+borderCountryCode)
            .then(borderCountry => borderCountry.json())
            .then(borderCountry => {
                console.log(borderCountry)
                let alink = document.createElement('a')
                alink.href = "country.html?code="+borderCountry.alpha3Code
                alink.innerText = borderCountry.name

                borders.appendChild(alink)
            })
        })

        let countryDiv = document.getElementById('countryDiv')
        countryDiv.classList.add('loaded')
    })



