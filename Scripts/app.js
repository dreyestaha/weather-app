const cityForm = document.querySelector("form");
const domCard = document.querySelector(".card");
const domDetails = document.querySelector(".weatherdetails");
const domImg = document.querySelector("img.time");
const domIcon = document.querySelector(".icon img");
//invocamos la clase Forecast
const forecast = new Forecast();

//update DOM
const updateUI = (data) =>{
    const {weather, cityDetails} =data;

    //update city data
    domDetails.innerHTML=
    `
        <h2 class="my-3">${cityDetails.EnglishName}</h2>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <!-- &deg; es para mostrar el símbolo de grados -->
            <span>&deg;C</span> 
        </div>
    `

    // update images and icon
    let iconImg = `./assets/IMG/icons/${weather.WeatherIcon}.svg`
    domIcon.setAttribute("src", iconImg);

    //Ternary Operator: evalua una condición, asigna el valor de la izquierda si es true, de la derecha si es false:
    const timeSrc = weather.IsDayTime ? "./assets/IMG/day.svg" : "./assets/IMG/night.svg";
    domImg.setAttribute("src", timeSrc);

    //remove d-none class to show details
    if(domCard.classList.contains("d-none")){
        domCard.classList.remove("d-none");
    }
};



cityForm.addEventListener("submit", e =>{
    e.preventDefault();
    
    //get city input and reset form
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update city for UI
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(data => console.log(data));

    //set last location to local Storage
    localStorage.setItem("location", city);
});

//load previous city on start
if(localStorage.getItem("location")){
    forecast.updateCity(localStorage.getItem("location"))
    .then(data => updateUI(data))
    .catch(data => console.log(data));
};
