import React from 'react';
import WeatherDisplay from './openWeather';

const url: string = "https://api.openweathermap.org/data/2.5/weather";

interface Location {
    coords: {
        latitude: number,
        longitude: number
    }
}

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
            fetch(`${url}?lat=${this.state.lat}&lon=${this.state.long}&units=imperial&appid=${process.env.REACT_APP_KEY}`)
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
        // call functions
        // need to setTimeout as function is picking up this.state first. Let coordinates be found first.
        // fixed weatherStatus function
        locationStatus();
        setTimeout(weatherStatus, 1);
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