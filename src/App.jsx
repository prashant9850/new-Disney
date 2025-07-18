import Header from "./Components/Header";
import Slider from "./Components/Slider";
import ProductionHouse from "./Components/ProductionHouse";
import GenereMovielist from "./Components/GenereMovielist";

function App() {
  return (
    <div className="bg-deepPersianBlue text-white min-h-screen">
      <div className="w-full mx-auto pb-10">
        <div className="pt-2">
          <Header />
        </div>
        <Slider />
      </div>
      <div>
        <ProductionHouse />
      </div>
      <div>
        <GenereMovielist />
      </div>
    </div>
  );
}

export default App;
