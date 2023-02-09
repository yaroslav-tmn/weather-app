import "./CityInfoCard.css";

const CityInfoCard = (props) => {
  return (
    <div className="info-card">
      <h3>Город: {props.citydata.cityName}</h3>
      <h3>Температура: {props.citydata.cityTemp}</h3>
    </div>
  );
};

export default CityInfoCard;
