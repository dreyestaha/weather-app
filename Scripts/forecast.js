class Forecast {
    constructor(){
        this.key = "vXoEuvhIA9vNQFBD5HvpIozPqRPPvBTt";
        //URI: Uniform Resource Identifier
        this.cityURI = "http://dataservice.accuweather.com/locations/v1/cities/search";
        this.weatherURI = "http://dataservice.accuweather.com/currentconditions/v1/";
    }
    async updateCity(city){
        //get data from API
        const cityDetails = await this.getCity(city);
        const weather = await this.getWeather(cityDetails.Key);
        return {cityDetails, weather};
   
    }
    async getCity(city){
        //query comienza con ?, el segundo va con & como un "and"
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURI+query);
        const data = await response.json();
        return data[0];
    }
    async getWeather(cityKey){
        const query = `${cityKey}?apikey=${this.key}`;
        const response = await fetch(this.weatherURI+query);
        const data = await response.json();
        return data[0];
    }
}


