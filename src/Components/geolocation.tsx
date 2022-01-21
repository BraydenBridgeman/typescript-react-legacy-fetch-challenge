import React from 'react';
import WeatherDisplay from './openWeather';

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

type weatherProp = {
}

interface Location {
    coordinates: {
        latitude: number,
        longitude: number
    }
}

const APIKey: string = "9cf41ee08e20c6e82d77c94d22694b64";
const url: string = "https://api.openweathermap.org/data/2.5/weather";

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
        const locationError = () => console.log("Location could not be found")
        
        const locationSuccessful = (location: Location) => {
            console.log(location.coordinates)
            this.setState({
                lat: location.coordinates.latitude,
                long: location.coordinates.longitude
            })
        }

        const locationStatus = () => {
            navigator.geolocation.getCurrentPosition(locationSuccessful, locationError, {
                enableHighAccuracy: true,
                maximumAge: 30000,
                timeout: 27000
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