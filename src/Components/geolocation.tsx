import React from 'react';
import WeatherDisplay from './openWeather';

const APIKey: string = "9cf41ee08e20c6e82d77c94d22694b64";
const url: string = "https://api.openweathermap.org/data/2.5/weather";

type LocateUser = {
    lat: number,
    long: number,
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

interface Location {
    coords: {
        latitude: number,
        longitude: number
    }
}

type weatherProp = {
    // empty assignment type
}

class LocationOfUser extends React.Component <weatherProp, LocateUser> {
    constructor(props: weatherProp) {
        super(props)
        this.state = {
            lat: 0,
            long: 0,
            weather: {
                description: "description",
                temp: 0,
                feels_like: 0,
                temp_min: 0,
                temp_max: 0,
                pressure: 0,
                humidity: 0
            }
        }
    }

    componentDidMount() {
        const errorLocation = () => console.log('Error getting location data.')

        const successLocation = (position: Location) => {
            console.log(position.coords)
            this.setState({
                lat: position.coords.latitude,
                long: position.coords.longitude
            })
        }

        const locationStatus = () => {
            navigator.geolocation.getCurrentPosition(successLocation, errorLocation, { 
                enableHighAccuracy: true, 
                maximumAge: 0, 
                timeout: 5000
            });
        }

        const weatherStatus = () => {
            fetch(`${url}?lat=${this.state.lat}&lon=${this.state.long}&appid=${APIKey}&units=imperial`)
                .then(res => res.json())
                .then(res => {
                    this.setState(prevState => ({
                        weather: {
                            ...prevState.weather,
                            description: res.weather[0].description,
                            temp: res.main.temp,
                            feels_like: res.main.feels_like,
                            temp_min: res.main.temp_min,
                            temp_max: res.main.temp_max,
                            pressure: res.main.pressure,
                            humidity: res.main.humidity
                        }
                    }))
                })
        }
        // call location and weather functions
        locationStatus();
        weatherStatus();
    };

    render() {
        return(
            <div>
                <WeatherDisplay weather={this.state.weather} />
            </div>
        )
    }
};

export default LocationOfUser;