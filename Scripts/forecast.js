//key de la api de Accuweather
const key = "vfCTyftG7LI9T3JG7orcpGf6Gf4G1mN1";

//Get the city Info
const getCity = async (city) =>{

    const baseUrl = "http://dataservice.accuweather.com/locations/v1/cities/search";
    //query comienza con ?, el segundo va con & como un "and"
    const query = `?apikey=${key}&q=${city}`;
    
    const response = await fetch(baseUrl+query);
    const data = await response.json();
    //devuelve un array con todas las coincidencias con el texto. El primer elemento
    //es el más cercano, así que nos quedamos con ese.
    return data[0];
};

//to get current conditions of city
const getWeather = async (cityKey) =>{
    const baseUrl = "http://dataservice.accuweather.com/currentconditions/v1/";
    const query = `${cityKey}?apikey=${key}`;

    const response = await fetch(baseUrl+query);
    const data = await response.json();
    return data[0];
};

// getWeather("60449").then(data => console.log(data))

// getCity("Santiago Chile")
//     .then(data => {
//         return getWeather(data.Key);
//     }).then(data =>{
//         console.log(data);
//     }).catch(err => console.log(err));

