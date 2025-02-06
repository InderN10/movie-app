"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Movie } from "@/types/Movie-type";
import { useParams } from "next/navigation";
import { Play, Star } from "lucide-react";
import Image from "next/image";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
function MovieGuideCard() {
  const router = useParams();
  const { id } = router;

  const [movieGuide, setMovieGuide] = useState<Movie | null>(null);
  const [director, setDirector] = useState<{
    name: string;
    job: string;
  } | null>(null);
  // const [similarMovie, setSimilarMovie] = useState<any>(null);
  console.log(director);

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  useEffect(() => {
    if (!id) return;

    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `${TMDB_BASE_URL}/movie/${id}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${TMDB_API_TOKEN}`,
            },
          }
        );
        const Director = await axios.get(
          `${TMDB_BASE_URL}/movie/${id}/credits?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${TMDB_API_TOKEN}`,
            },
          }
        );
        // const similarMovie = await axios.get(
        //   `${TMDB_BASE_URL}/movie/${id}/similar?language=en-US&page=1`,
        //   {
        //     headers: {
        //       Authorization: `Bearer ${TMDB_API_TOKEN}`,
        //     },
        //   }
        // );

        setMovieGuide(response.data);
        console.log("wedsgfwedt", response.data);

        setDirector(Director.data);

        // setSimilarMovie(similarMovie.data.results);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMovieDetails();
  }, [id]);

  return (
    <div>
      <div className="flex justify-between p-5">
        <div className="justify-start items-center text-2xl font-semibold">
          {movieGuide && movieGuide.title}{" "}
          <div className="flex items-center gap-1">
            <div className="flex text-sm font-normal ">
              {movieGuide && movieGuide.release_date}
            </div>
            {"·"} <p className="text-sm font-normal">PG</p>
            {"·"}
            <div className="flex text-sm font-normal">
              {movieGuide && movieGuide.runtime
                ? formatRuntime(movieGuide.runtime)
                : null}
            </div>
          </div>
        </div>
        <div className="flex gap-1 items-center">
          <Star className="fill-yellow-400 text-yellow-400 h-6 w-6" />
          <div className="flex flex-col text-sm font-normal">
            <div>{movieGuide && movieGuide.vote_average}/10</div>
            <div>{movieGuide && movieGuide.vote_count}</div>
          </div>
        </div>
      </div>
      <div className="w-[374px] h-[219px] max-w-[375px] max-h-[210px] relative">
        <Image
          src={`https://image.tmdb.org/t/p/w1280${movieGuide?.backdrop_path}`}
          width={8001}
          height={8010}
          alt="Picture of the author"
        />
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div className="bg-white w-[40px] h-[40px] flex items-center justify-center rounded-full  ">
            <Play className="w-4 h-4" />
          </div>
          <p className="text-white font-normal text-base">Play trailer</p>
        </div>
      </div>
      <div className="flex">
        <div>
          <Image
            src={`https://image.tmdb.org/t/p/w1280${movieGuide?.poster_path}`}
            width={8001}
            height={8010}
            alt="Picture of the author"
          />
        </div>
        <div>
          {movieGuide &&
            movieGuide.genre_ids.map((genreId) => (
              <span key={genreId}>{genreId}</span>
            ))}
        </div>
      </div>
    </div>
  );
}

export default MovieGuideCard;
