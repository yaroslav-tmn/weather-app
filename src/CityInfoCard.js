import "./CityInfoCard.css";
import WeatherCodes from "./WeatherCodes";

const CityInfoCard = (props) => {
  return (
    <div className="info-card">
      <h3>Город: {props.citydata.cityName}</h3>
      <h3>Температура: {props.citydata.cityTemp}</h3>
      <h3>Погода: {WeatherCodes[props.citydata.cityWeatherCode]}</h3>
    </div>
  );
};

export default CityInfoCard;
