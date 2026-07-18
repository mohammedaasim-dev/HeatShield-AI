const API_KEY = "9d9ec12d364a93ce2223afdeaf54f6ff";

export async function getWeather(lat, lon) {

    const response = await fetch(

        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`

    );

    const data = await response.json();

    return data;

}