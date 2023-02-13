import "./CityInfoCard.css";
import WeatherCodes from "./WeatherCodes";

const CityInfoCard = (props) => {
  return (
    <div className="info-card">
      <span style={{ color: "#000000" }}>Город:</span> {props.citydata.cityName}
      <br />
      <span style={{ color: "#000000" }}>Температура:</span>{" "}
      {Math.round(props.citydata.cityTemp)} °C
      <br />
      <span style={{ color: "#000000" }}>Погода:</span>{" "}
      {WeatherCodes[props.citydata.cityWeatherCode]}
    </div>
  );
};

export default CityInfoCard;
