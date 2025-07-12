import React, { useEffect } from "react";
import GlobalApi from "../Services/GlobalApi";

function Slider() {
  useEffect(() => {
    getTrendingMovies();
  }, []);

  const getTrendingMovies = () => {
    GlobalApi.getTrendingVideos.then((resp) => {
      console.log(resp.data.results);
    });
  };

  return <div>Slider</div>;
}

export default Slider;
