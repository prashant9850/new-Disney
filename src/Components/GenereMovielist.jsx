import React, { useEffect, useState } from "react";
import { FaCirclePlay } from "react-icons/fa6";
import GlobalApi from "../Services/GlobalApi";
import genreList from "../Constant/GenresList";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function GenereMovielist() {
  const [moviesByGenre, setMoviesByGenre] = useState({});

  useEffect(() => {
    genreList.forEach((genre) => {
      GlobalApi.getMovieByGenreId(genre.id).then((res) => {
        setMoviesByGenre((prev) => ({
          ...prev,
          [genre.name]: res.data.results,
        }));
      });
    });
  }, []);

  return (
    <div className="px-6 sm:px-14 py-8 space-y-12">
      {genreList.map((genre) => (
        <div key={genre.id}>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-5">
            {genre.name}
          </h2>
          <div className="flex overflow-x-auto gap-6 pb-2 no-scrollbar">
            {(moviesByGenre[genre.name] || []).map((movie) => (
              <div
                key={movie.id}
                className="group relative flex-shrink-0 w-[130px] h-[195px] sm:w-[160px] sm:h-[240px] md:w-[200px] md:h-[300px] z-10"
              >
                {/* Movie Poster */}
                <img
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover rounded-xl shadow-lg group-hover:border-[2px] group-hover:border-white"
                />

                {/* Rating Badge */}
                <div className="absolute top-2 right-2 text-yellow-400 bg-black/60 text-lg font-extrabold drop-shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 px-1.5 rounded">
                  ⭐ {movie.vote_average}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 rounded-xl flex flex-col justify-end space-y-1 z-20">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold truncate">{movie.title}</p>
                    <FaCirclePlay className="text-xl text-white hover:text-gray-300 transition" />
                  </div>
                  <p className="text-xs text-gray-300">
                    Year: {movie.release_date?.split("-")[0]}
                  </p>
                  <p className="text-xs text-gray-300">
                    Lang: {movie.original_language?.toUpperCase()}
                  </p>
                  <p className="text-xs line-clamp-2 text-gray-400">
                    {movie.overview}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default GenereMovielist;
