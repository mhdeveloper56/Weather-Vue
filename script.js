document.getElementById('search').addEventListener('click', () => {
    document.getElementById('search-container').style.display = 'none'
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

        function capitalizeFirstLetter(word) {
            return word.replace(/^\w/, function (match) {
                return match.toUpperCase();
            });
        }
        let capitalizedWord = capitalizeFirstLetter(city);

        let IsDay = json.current.is_day

        if (IsDay === 0) {
            document.getElementById('weather-container').style.background = 'linear-gradient(90deg, rgba(90,200,250,1) 0%, rgba(121,228,254,1) 91%)'
        } else {
            console.log(IsDay);
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
            if (window.matchMedia("(max-width: 480px)").matches) {
                document.getElementById('weather-location').innerHTML = `${capitalizedWord} Weather`;
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
        document.getElementById('statement').innerHTML = `${json.current.condition.text}`
        document.getElementById('wind-speed').innerHTML = `Wind (${json.current.wind_dir})`


        let img = document.querySelector('#weather-icon img');
        let statement = json.current.condition.text;


        if (IsDay === 0) {
            if (statement == 'Partly cloudy') {
                img.src = '/images/partial clouds night.png'
            }
        } else if (IsDay === 1) {
            if (statement == 'Partly cloudy') {
                img.src = '/images/partial clouds.png'
            }
        }

        switch (statement) {
            case 'Clear':
                img.src = '/images/moon.png'
                break;

            case 'Sunny':
                img.src = '/images/sunny.png'
                break;

            case 'Mist':
                img.src = '/images/mist.png'
                break;

            case 'Patchy rain possible':
                img.src = '/images/rain.png'
                break;

            case 'Overcast':
                img.src = '/images/cloudy.png'
                break;

            case 'Light rain':
                img.src = '/images/rain.png'
                break;

            case 'Cloudy':
                img.src = '/images/cloudy.png'
                break;
            default:
                break;
        }

    })
})
