import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import addDays from "date-fns/addDays";

const Weather = ({ city, state }) => {
  const weather = useSelector((state) => state.locations.weather.daily);
  const dayMapping = {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
  };

  if (!weather) return;

  return (
    <>
      <h4 div className="weather-desc">
        7-Day Forecast for {city}, {state}
      </h4>
      <div className="weather-container">
        {weather.map((day, i) => {
          if (!i) return null;
          const today = new Date();
          const [year, month, date] = [
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
          ];
          const dayOfWeek = addDays(new Date(year, month, date), i).getDay();
          const dayAbbrev = dayMapping[dayOfWeek];

          return (
            <div key={i} className={`day ${i}`}>
              <div className="day-name">{dayAbbrev}</div>
              <img
                className="icon"
                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              />
              <div className="max">
                {Math.round(day.temp.max)}
                {"\u00B0"}F
              </div>
              <div className="min">
                {Math.round(day.temp.min)}
                {"\u00B0"}F
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Weather;
