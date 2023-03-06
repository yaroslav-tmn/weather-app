import { useEffect } from "react";
import "./CityInfoCard.css";
import WeatherCodes from "./WeatherCodes";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const CityInfoCard = (props) => {
  const placesWithImages = [];
  const getImagesUrls = async (ids) => {
    const responses = await Promise.all(
      ids.map((id) =>
        fetch(
          `http://api.opentripmap.com/0.1/ru/places/xid/${id}?apikey=5ae2e3f221c38a28845f05b67f614f533f4239a3fc9b5c8e16e194c9`
        ).then((response) => response.json())
      )
    );
    placesWithImages.push(
      ...responses.filter((obj) => obj.hasOwnProperty("preview"))
    );
  };

  useEffect(() => {
    getImagesUrls(props.places);
  }, [props.places]);

  return (
    <div className="info-card">
      <span style={{ color: "#000000" }}>Город:</span> {props.citydata.cityName}
      <br />
      <span style={{ color: "#000000" }}>Температура:</span>
      {props.citydata.cityTemp
        ? ` ${Math.round(props.citydata.cityTemp)} °C`
        : ""}
      <br />
      <span style={{ color: "#000000" }}>Погода:</span>{" "}
      {WeatherCodes[props.citydata.cityWeatherCode]}
      <br />
      <Slide>
        {placesWithImages.map((place) => (
          <div className="each-slide-effect">
            <div
              style={{
                backgroundImage: `url(${placesWithImages[place].preview.source})`,
              }}
            >
              <span>Slide {`${place + 1}`}</span>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default CityInfoCard;
