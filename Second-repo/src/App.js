import React, { Component } from "react";
import "./App.css";



const PLACES = [
    { name: "Vinnytsia", zip: "vinnytsya" },
    { name: "Dnipro", zip: "dnipropetrovsk" },
    { name: "Donetsk", zip: "donetsk" },
    { name: "Zhytomyr", zip: "zhytomyr" },
    { name: "Zaporizhzhia", zip: "zaporizhzhya" },
    { name: "Ivano-Frankivsk", zip: "ivano-frankivsk" },
    { name: "Kyiv", zip: "kiev" },
    { name: "Kropivnitskii", zip: "kirovohrad" },
    { name: "Luhansk", zip: "luhansk" },
    { name: "Lutsk", zip: "lutsk" },
    { name: "Lviv", zip: "lviv" },
    { name: "Mykolaiv", zip: "mykolayiv" },
    { name: "Odessa", zip: "odessa" },
    { name: "Poltava", zip: "poltava" },
    { name: "Rivne", zip: "rivne" },
    { name: "Sumy", zip: "sumy" },
    { name: "Ternopil", zip: "ternopil" },
    { name: "Uzhhorod", zip: "uzhhorod" },
    { name: "Kharkiv", zip: "kharkiv" },
    { name: "Kherson", zip: "kherson" },
    { name: "Khmelnytskyi", zip: "khmelnytskyy" },
    { name: "Cherkasy", zip: "cherkasy" },
    { name: "Chernihiv", zip: "chernihiv" },
    { name: "Chernivtsi", zip: "chernivtsi" }
];

class WeatherDisplay extends Component {
    constructor() {
        super();
        this.state = {
            weatherData: null
        };
    }
    componentDidMount() {
        const zip = this.props.zip;
        const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
            zip +
            "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
        fetch(URL).then(res => res.json()).then(json => {
            this.setState({ weatherData: json });
        });
    }
    render() {
        const weatherData = this.state.weatherData;
        if (!weatherData) return <div > Loading < /div>;
        const weather = weatherData.weather[0];
        const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
        return ( <
            div >
            <
            h1 > { weather.main } in { weatherData.name } <
            img src = { iconUrl }
            alt = { weatherData.description }
            /> < /
            h1 > <
            p > Current: {
                Math.round(
                    (weatherData.main.temp - 32) / 1.8)
            }°
            C < /p> <
            p > High: {
                Math.round(
                    (weatherData.main.temp_max - 32) / 1.8)
            }°
            C < /p> <
            p > Low: {
                Math.round(
                    (weatherData.main.temp_min - 32) / 1.8)
            }°
            C < /p> <
            p > Wind Speed: { Math.round(weatherData.wind.speed * 0.44704) }
            m / s < /p>  <
            p > Humidity: { weatherData.main.humidity } %
            <
            /p>  <
            p > Country: { weatherData.sys.country } < /p>< /
            div >
        );
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            activePlace: 0
        };
    }
    handleChange(event) {
        this.setState({ zip: event.target.zip });
    }

    handleSubmit(event) {
        alert(this.state.zip);
        event.preventDefault();
    }

    render() {
        const activePlace = this.state.activePlace;
        return ( <
            div className = "App" > {
                PLACES.map((place, index) => ( <
                    button key = { index }
                    onClick = {
                        () => {
                            this.setState({ activePlace: index });
                        }
                    }
                    className = "city" > { place.name } <
                    /button>
                ))
            } <
            WeatherDisplay key = { activePlace }
            zip = { PLACES[activePlace].zip }
            />  <
            /
            div >
        );
    }
}

export default App;