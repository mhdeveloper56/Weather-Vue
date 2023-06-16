//-------  Displaying Logo -------//

document.getElementById('logo-div').classList.add('fadeIn')
function DisplayingLogo() {
    return new Promise((resolve) => {
        setTimeout(() => {
            document.getElementById('logo-div').style.display = 'none';
            document.getElementById('search-container').style.display = 'flex';
            resolve();
        }, 2500);
        document.getElementById('search-container').classList.add('fadeIn')
    });
}
window.addEventListener('load', () => {
    DisplayingLogo()

        .catch((error) => {
            console.error('Some Error Occures During Resolving Promise', error);
        });
});


// ----- Displaying Weather Details ----- //

const ViewWeather = () => {
    document.getElementById('search-container').style.display = 'none'
    document.getElementById('weather-container').classList.add('fadeIn')
    document.getElementById('weather-container').style.display = 'flex'
    document.body.style.background = '#232634'

    const APIKey = '1255b307aacb467ea2b202637231006';
    const city = document.getElementById('location').value;
    // city = 'Washington'

    if (city === '')
        return

    fetch(`https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}`).then(response => response.json()).then(json => {

        console.log(json);

        let ActualTemprature = Math.round(json.current.temp_c)

        let IsDay = json.current.is_day

        if (IsDay === 0) {
            document.getElementById('weather-container').style.background = 'linear-gradient(90deg, rgba(90,200,250,1) 0%, rgba(121,228,254,1) 91%)'
        } else {
            document.getElementById('weather-container').style.background = ' linear-gradient(90deg, rgba(255,190,148,1) 31%, rgba(250,225,112,1) 100%)'
            console.log(IsDay);
        }

        if (ActualTemprature < 6) {
            document.getElementById('weather-container').style.background = 'linear-gradient(90deg, rgba(90,200,250,1) 0%, rgba(121,228,254,1) 91%)'
        } 

        // Coverting Date String InTo read-able Local-Time

        let date_string = json.location.localtime

        const dateString = date_string;
        const date = new Date(dateString);

        const hours = date.getHours();
        const minutes = date.getMinutes();

        let formattedHours = hours % 12;
        formattedHours = formattedHours === 0 ? 12 : formattedHours;
        const period = hours < 12 ? "am" : "pm";

        const formattedTime = `${formattedHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}${period}`;


        function handleViewportChange() {
            if (window.matchMedia("(max-width: 420px)").matches) {
                document.getElementById('weather-location').innerHTML = `${json.location.name}`;
            } else {
                document.getElementById('weather-location').innerHTML = `${json.location.name} Weather`
            }
        }

        window.addEventListener("resize", handleViewportChange);
        handleViewportChange()


        document.getElementById('temp').innerHTML = `${ActualTemprature} °C`
        document.getElementById('tempfeelsC').innerHTML = `Feels: ${json.current.feelslike_c} °C`
        document.getElementById('tempfeelsF').innerHTML = `Feels: ${json.current.feelslike_f} °F`
        document.getElementById('humidityr').innerHTML = `${json.current.humidity}%`
        document.getElementById('date-time').innerHTML = `Time: ${formattedTime}`
        document.getElementById('windr').innerHTML = ` ${json.current.wind_kph}Km/h`
        document.getElementById('pressurer').innerHTML = `${json.current.pressure_in} pa`
        document.getElementById('wind-speed').innerHTML = `Wind (${json.current.wind_dir})`
        
        
        let img = document.querySelector('#weather-icon img');
        let statement = json.current.condition.text;
        
        let words = ['thundery','thunderstorm'];

        for (const word of words) {
            if (statement.toLowerCase().includes(word)) {
                statement = 'Thunderstorm Possible'
                img.src = 'images/thunder.png'
                break;
            } else if (statement == 'Moderate or heavy rain with thunder') {
                statement = 'Heavy Rain'
                img.src = 'images/thunder.png'
                break;
            }}

            document.getElementById('statement').innerHTML = `${statement}`
            
        if (IsDay === 0) {
            if (statement == 'Partly cloudy') {
                img.src = 'images/partial clouds night.png'
            }
        } else if (IsDay === 1) {
            if (statement == 'Partly cloudy') {
                img.src = 'images/partial clouds.png'
            }
        }

        switch (statement) {
            case 'Clear':
                if (ActualTemprature < 6) {
                    img.src = 'images/snow.png'
                } else {
                    img.src = 'images/moon.png'
                }
                break;

            case 'Sunny':
                img.src = 'images/sunny.png'
                break;

            case 'Mist':
                img.src = 'images/mist.png'
                break;

            case 'Patchy rain possible':
                img.src = 'images/rain.png'
                break;

            case 'Overcast':
                img.src = 'images/cloudy.png'
                break;

            case 'Light rain':
                img.src = 'images/rain.png'
                break;

            case 'Cloudy':
                img.src = 'images/cloudy.png'
                break;

            case 'Light rain shower':
                img.src = 'images/rain.png'
                break;

            case 'Moderate rain':
                img.src = 'images/rain.png'
                break;
            default:
                break;
        }

    })
}

document.getElementById('search').addEventListener('click', ViewWeather);
document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault();
    ViewWeather();
});




// ----- Going Back To Search Page ----- //

document.getElementById('back-search').addEventListener('click', () => {
    document.getElementById('search-container').style.display = 'flex'
    document.getElementById('weather-container').style.display = 'none'
    document.body.style.background = ''

})
