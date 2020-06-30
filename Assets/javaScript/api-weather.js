function getWeather(fromCity, toCity) {
    $.when(
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + 
            fromCity + "&units=metric&appid=0fb779217270dc1943ca287687bf9395",
            method: "GET"
        }),
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + 
            toCity +  "&units=metric&appid=0fb779217270dc1943ca287687bf9395",
            method: "GET"
        }),
    ).done(function(fromCityWeather, toCityWeather) {

        if (fromCityWeather[0].weather[0].main === "Rain") {
            $("#icon0").text("flash_on");
        }else if (fromCityWeather[0].weather[0].main === "Clear") {
            $("#icon0").text("wb_sunny");
        }else if (fromCityWeather[0].weather[0].main === "Clouds") {
            $("#icon0").text("cloud");
        }else if (fromCityWeather[0].weather[0].main === "Snow") {
            $("#icon0").text("ac_unit");
        }else {
            $("#icon0").text("");
        };
        if (toCityWeather[0].weather[0].main === "Rain") {
            $("#icon1").text("flash_on");
        }else if (toCityWeather[0].weather[0].main === "Clear") {
            $("#icon1").text("wb_sunny");
        }else if (toCityWeather[0].weather[0].main === "Clouds") {
            $("#icon1").text("cloud");
        }else if (toCityWeather[0].weather[0].main === "Snow") {
            $("#icon1").text("ac_unit");
        }else {
            $("#icon1").text("");
        };
        
        $("#maxTemp1").text("Max Temp: " + Math.round(fromCityWeather[0].main.temp_max) + " C");
        $("#minTemp1").text("Min Temp: " + Math.round(fromCityWeather[0].main.temp_min) + " C");
        $("#day1").text("Forecast: " + fromCityWeather[0].weather[0].main);

        $("#maxTemp2").text("Max Temp: " + Math.round(fromCityWeather[0].main.temp_max) + " C");
        $("#minTemp2").text("Min Temp: " + Math.round(fromCityWeather[0].main.temp_min) + " C");
        $("#day2").text("Forecast: " + fromCityWeather[0].weather[0].main);
    });
};