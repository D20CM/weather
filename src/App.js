import css from "./App.module.css";
import Card from "./components/Card/Card";
import { useState, useEffect } from "react";
import useFetch from "react-fetch-hook";

function App() {
  const [lat, setLat] = useState(33.44);
  const [lon, setLon] = useState(-94.04);
  const [searchTerm, setSearchTerm] = useState("Buenos Aires");
  const place =
    useFetch(`https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${searchTerm}&apiKey=${process.env.REACT_APP_GEOCODING_API_KEY}
  `);
  if (!place.isLoading) {
    console.log(place.data);
  }

  useEffect(() => {
    if (place.data) {
      setLat(place.data.locations[0].referencePosition.latitude);
      setLon(place.data.locations[0].referencePosition.longitude);
    }
  }, [place]);

  const weather = useFetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude={part}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
  );

  console.log(weather.data);

  return (
    <div className={css.App}>
      <h1>Weather App</h1>
      <h2 className={css.placeName}>{searchTerm}</h2>
      {place.data && weather.data && searchTerm
        ? weather.data.daily.map((day, index) => (
            <>
              <Card
                key={index}
                searchTerm={searchTerm}
                place={place}
                weather={day}
              />
            </>
          ))
        : null}
    </div>
  );
}

export default App;
