import "./CityAuto.css";
import { useKeyboardsNavigation } from "./hooks";

const CityAuto = (props) => {
  const { cities, onSelectCity } = props;

  const { activeIndex, getCityWeather } = useKeyboardsNavigation(cities, onSelectCity);

  return (
    <ul className="city-list">
      {props.cities.map((item, index) => (
        <li
          className={`city-list__item ${index === activeIndex ? "active" : ""}`}
          id={`city-${index}`}
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
