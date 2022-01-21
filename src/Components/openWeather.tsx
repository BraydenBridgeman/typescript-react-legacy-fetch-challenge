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
        document.title = `Weather in Your Location!`;
    }, [])

    return(
        <div>
            <ul>
                <h1>Description: {props.weather.description} in your area</h1>
                <br></br>
                <h2>Temperature: {props.weather.temp} degrees</h2>
                <br></br>
                <h2>Feels like: {props.weather.feels_like} degrees</h2>
                <br></br>
                <h2 style={{ color: 'blue' }}>Low: {props.weather.temp_min} degrees</h2>
                <br></br>
                <h2 style={{ color: 'red' }}>High: {props.weather.temp_max} degrees</h2>
                <br></br>
                <h2>Pressure: {props.weather.pressure} hPa</h2>
                <br></br>
                <h2>Humidity: {props.weather.humidity}%</h2>
            </ul>
        </div>
    );
}



export default WeatherDisplay;