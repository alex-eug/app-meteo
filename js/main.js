import orderDays from "./usingTool/timeHow.js";
//import searchCity from "./usingTool/searchCity.js";

const keyApi = "254350759447b3094f19480fd0a9d2dc"
const geoApi = "https://geo.api.gouv.fr/communes"
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const currentCity = document.querySelector('.currentCity');
const hour = document.querySelectorAll('.hour-prevision');
const hourTemperature = document.querySelectorAll('.hour-temperature');
const day = document.querySelectorAll('.day-prevision');
const dayTemperature = document.querySelectorAll('.day-temperature');
const logoMeteo = document.querySelector('.logo-meteo')
const populationN = document.querySelector('.populationN')
const surfaceN = document.querySelector('.surfaceN')
const postalN = document.querySelector('.postalN')
const departmentN = document.querySelector('.departmentN')

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        callWeather(long, lat)
        getCity(long, lat)
    }, () => {
        alert('Veuillez accepter la géolocalisation')
    })
}



const callWeather = (long, lat) => {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${keyApi}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            //console.log(data);
            weather.innerText = data.current.weather[0].description;
            temperature.innerText = Math.trunc(data.current.temp) + "°"
            logoMeteo.setAttribute("src", `http://openweathermap.org/img/wn/${data.hourly[0].weather[0].icon}@2x.png`)
            let hourNow = new Date().getHours();
            for (let i = 0; i < hour.length; i++) {
                let hourMore = hourNow + i * 2;

                if (hourMore > 24) {
                    hour[i].innerText = `${hourMore - 24}h`
                } else if (hourMore === 24) {
                    hour[i].innerText = `00h`
                } else {
                    hour[i].innerText = `${hourMore}h`
                }

            }

            for (let j = 0; j < hourTemperature.length; j++) {
                hourTemperature[j].innerText = `${Math.trunc(data.hourly[j * 2].temp)}°`
            }

            for (let k = 1; k < orderDays.length; k++) {
                day[k].innerText = orderDays[k].slice(0, 3)
            }
            for (let m = 1; m < 7; m++) {
                dayTemperature[m].innerText = `${Math.trunc(data.daily[m + 1].temp.day)}°`
            }

        })

}
let population
let surface
let postal
let department


const getCity = (long, lat) => {

    fetch(`${geoApi}?lat=${lat}&lon=${long}&fields=code,nom,codesPostaux,surface,population,centre,contour,departement`)

        .then((response) => {
            return response.json()
        })
        .then((cit) => {
            //console.log("yo", cit);
            let city = cit[0].nom;
            currentCity.innerText = city
            population = cit[0].population
            //console.log(population);
            surface = Math.trunc(cit[0].surface / 100) + "km²"
            //console.log(surface);
            postal = cit[0].codesPostaux[0]
            department = cit[0].departement.nom
            postalN.innerText = "Code postal: " + postal
            surfaceN.innerText = "Superficie: " + surface
            populationN.innerText = "Population: " + population + " hab"
            departmentN.innerText = "Département: " + department
        })
        .then(() => {
            lgDat()
        })

}


const lgDat = () => {
    currentCity.addEventListener('click', () => {
        const detail = document.querySelector('.detail-city')
        detail.classList.toggle("hidden")
    })
}

//search city by zipcode with search city folder 
// searchCity()

