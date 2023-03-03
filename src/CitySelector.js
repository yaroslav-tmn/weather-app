import "./CitySelector.css";
import CityAuto from "./CityAuto";
import CityInfoCard from "./CityInfoCard";
import { useEffect, useState } from "react";

function CitySelector() {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [cityData, setCityData] = useState({});
  const [placesIds, setPlacesIds] = useState([]);

  const getCityData = async function (typingCity) {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${typingCity}&language=ru`
    );
    const result = await response.json();
    if (result.hasOwnProperty("results")) {
      setCities(result.results);
    }
  };

  useEffect(() => {
    const timeBeforeRequest = setTimeout(() => {
      if (query === "") {
        setCities([]);
      }
      getCityData(query);
    }, 500);
    return () => clearTimeout(timeBeforeRequest);
  }, [query]);

  const getCityInfo = async function (citydata) {
    const response = await fetch(
      `http://api.opentripmap.com/0.1/ru/places/radius?lang=ru&radius=1000&lon=${citydata.cityLon}&lat=${citydata.cityLat}&apikey=5ae2e3f221c38a28845f05b67f614f533f4239a3fc9b5c8e16e194c9`
    );
    const result = await response.json();
    const ids = [];
    if (result.features.length < 10) {
      result.features.map((e) => ids.push(e.properties.xid));
    } else {
      while (ids.length < 9) {
        const randomIndex = Math.floor(Math.random() * result.features.length);
        const potencialObjectXid = result.features[randomIndex].properties.xid;
        if (!ids.includes(potencialObjectXid)) {
          ids.push(potencialObjectXid);
        }
      }
    }
    setPlacesIds(ids);
  };

  const getSelectedCity = (selCityData) => {
    setCities([]);
    setQuery("");
    setCityData(selCityData);
    getCityInfo(selCityData);
  };

  return (
    <div className="city-selector">
      <input
        className="city-selector__input"
        type="text"
        placeholder="Название города"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      ></input>
      <CityInfoCard citydata={cityData} places={placesIds} />
      <CityAuto cities={cities} onSelectCity={getSelectedCity} />
    </div>
  );
}

export default CitySelector;
