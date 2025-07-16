import disney from "../assets/images/disney.png";
import marvel from "../assets/images/marvel.png";
import nationalG from "../assets/images/nationalG.png";
import pixar from "../assets/images/pixar.png";
import starwar from "../assets/images/starwar.png";

import disneyVid from "../assets/videos/disney.mp4";
import marvelVid from "../assets/videos/marvel.mp4";
import nationalGVid from "../assets/videos/national-geographic.mp4";
import pixarVid from "../assets/videos/pixar.mp4";
import starwarVid from "../assets/videos/star-wars.mp4";

const studios = [
  { image: disney, video: disneyVid },
  { image: marvel, video: marvelVid },
  { image: nationalG, video: nationalGVid },
  { image: pixar, video: pixarVid },
  { image: starwar, video: starwarVid },
];

function ProductionHouse() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-4 ">
      {studios.map((studio, index) => (
        <div
          key={index}
          className="relative w-40 h-40 rounded-lg overflow-hidden shadow-lg group cursor-pointer"
        >
          {/* Background video */}
          <video
            src={studio.video}
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
          {/* Logo image */}
          <img
            src={studio.image}
            alt="studio"
            className="z-10 relative w-full h-full object-contain p-4"
          />
        </div>
      ))}
    </div>
  );
}

export default ProductionHouse;
