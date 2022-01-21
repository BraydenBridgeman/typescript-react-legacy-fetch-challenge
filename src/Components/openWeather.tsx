import { useEffect } from 'react';

type weatherProp = {
    weather: {
        description: string,
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number
    }
}

function WeatherDisplay(props: weatherProp) {
    useEffect(() => {

    }, [])

    return(
        <div>
            <ul>
                <li>Description: {props.weather.description}</li>
                <li>Temperature: {props.weather.temp} degrees</li>
                <li>Feels Like: {props.weather.feels_like}</li>
                <li>Low: {props.weather.temp_min} degrees</li>
                <li>High: {props.weather.temp_max} degrees</li>
                <li>Pressure: {props.weather.pressure}</li>
                <li>Humidity: {props.weather.humidity}</li>
            </ul>
        </div>
    );
}



export default WeatherDisplay;