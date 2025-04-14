const cityForm = document.querySelector("form");
const domCard = document.querySelector(".card");
const domDetails = document.querySelector(".weatherdetails");
const domImg = document.querySelector("img.time");
const domIcon = document.querySelector(".icon img");

//update DOM
const updateUI = (data) =>{
    console.log(data);
    //declaración de variables como Destructuring
    const {weather, cityDetails} =data;
    //es lo mismo que esto:
        // const weather = data.weather;
        // const cityDetails = data.cityDetails;

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

//Update city function
const updateCity = async (city) =>{
    //get data from API
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    //la función retorna un objeto con los dos datos tomados de la api
    //el nombre de la propiedad y el valor son el mismo, se puede escribir así:
    return {cityDetails, weather};
    
    /*en lugar de:
    return {
        cityDetaisl: cityDetails,
        weather: weather
    }*/
};

cityForm.addEventListener("submit", e =>{
    e.preventDefault();
    
    //get city input and reset form
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update city for UI
    updateCity(city)
        .then(data => updateUI(data))
        .catch(data => console.log(data));
});