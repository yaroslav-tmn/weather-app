import { useCallback, useEffect, useState } from "react";

export const useKeyboardsNavigation = (cities, onSelectCity) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const getCityWeather = useCallback(
    async (item) => {
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
      cityDataForRender.cityLon = cityLongitude;
      cityDataForRender.cityLat = cityLatitude;
      onSelectCity(cityDataForRender);
    },
    [onSelectCity]
  );

  useEffect(() => {
    const selectionHandler = (event) => {
      if (event.key === "ArrowDown") {
        setActiveIndex(activeIndex !== cities.length - 1 ? activeIndex + 1 : 0);
      }

      if (event.key === "ArrowUp") {
        setActiveIndex(activeIndex > 0 ? activeIndex - 1 : cities.length - 1);
      }

      if (event.key === "Enter") {
        getCityWeather(cities[activeIndex]);
      }
    };

    document.addEventListener("keydown", selectionHandler);
    return () => {
      document.removeEventListener("keydown", selectionHandler);
    };
  }, [cities, getCityWeather, activeIndex]);

  return { activeIndex, getCityWeather };
};
