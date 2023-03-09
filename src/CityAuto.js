import { useEffect } from "react";
import "./CityAuto.css";

const CityAuto = (props) => {
  const getCityWeather = async function (item) {
    const cityLatitude = item.latitude;
    const cityLongitude = item.longitude;
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${cityLatitude}&longitude=${cityLongitude}&current_weather=true&timezone=auto`
    );
    const cityWeatherData = await response.json();
    const cityDataForRender = {};
    cityDataForRender.cityName = item.name;
    cityDataForRender.cityTemp = cityWeatherData.current_weather.temperature;
    cityDataForRender.cityWeatherCode =
      cityWeatherData.current_weather.weathercode;
    cityDataForRender.cityLon = cityWeatherData.longitude;
    cityDataForRender.cityLat = cityWeatherData.latitude;
    props.onSelectCity(cityDataForRender);
  };

  useEffect(() => {
    const selectionHandler = (event) => {
      if (event.key === "ArrowDown") {
        console.log("ВНИЗ");
      }
      if (event.key === "ArrowUp") {
        console.log("ВВЕРХ");
      }
    };
    document.addEventListener("keydown", selectionHandler);
    return () => {
      document.removeEventListener("keydown", selectionHandler);
    };
  }, []);

  return (
    <ul className="city-list">
      {props.cities.map((item) => (
        <li
          className="city-list__item"
          key={item.id}
          onClickCapture={() => {
            getCityWeather(item);
          }}
        >
          <b>{item.name}</b>, {item.admin1}, {item.country}
        </li>
      ))}
    </ul>
  );
};

export default CityAuto;
