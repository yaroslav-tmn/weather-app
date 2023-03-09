import "./App.css";
import CitySelector from "./CitySelector";
import "./CitySelector.css";

function App() {
  return (
    <div className="app">
      <CitySelector />
      <p className="city-selector">
        Это приложение показывает текущую погоду в выбранном городе, а так же
        отображает интересные изображения, связанные с городом, если удается их
        получить.
      </p>
    </div>
  );
}

export default App;
