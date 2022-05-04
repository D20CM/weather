import css from "./card.module.css";

import React from "react";

function Card({ searchTerm, weather, place }) {
  const date = new Date(weather.dt * 1000).toLocaleDateString();
  const options = { weekday: "long" };
  const day = new Intl.DateTimeFormat("en-GB", options).format(
    weather.dt * 1000
  );
  const iconURL = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  //   console.log(date);
  return (
    <div className={css.card}>
      <div className={css.cardHeader}>
        <h2>{day}</h2>
        <h3 className={css.date}>{date}</h3>
      </div>
      <p className={css.forecast}>{weather.weather[0].description}</p>
      <div className={css.cardWeatherInfo}>
        <p className={css.temperature}>{Math.round(weather.temp.day)}°C</p>
        <div className={css.minmax}>
          <p>Max: {weather.temp.max}</p>
          <p>Min: {weather.temp.min}</p>
        </div>
        <img src={iconURL} alt="weatherIcon" className={css.icon}></img>
      </div>
    </div>
  );
}

export default Card;
