"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Movie } from "@/types/Movie-type";
import { useParams } from "next/navigation";
import { Play, Star } from "lucide-react";
import Image from "next/image";
import { Director } from "@/types/Direction-type";
import { CastMember } from "@/types/CastMember";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

function MovieGuideCard() {
  const router = useParams();
  const { id } = router;
  const [movieGuide, setMovieGuide] = useState<Movie | null>(null);
  const [director, setDirector] = useState<Director | null>(null);
  const [credits, setCredits] = useState<CastMember[] | null>(null);
  const [trailerData, setTrailerData] = useState<string | null>(null);

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getTrailerData = async (id: number) => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${id}/videos?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      const trailers = response.data.results;
      if (trailers.length > 0) {
        const youtubeTrailer = trailers.find(
          (trailer: { site: string; key: string }) => trailer.site === "YouTube"
        );
        if (youtubeTrailer) {
          setTrailerData(`https://www.youtube.com/embed/${youtubeTrailer.key}`);
        } else {
          setTrailerData(null);
        }
      } else {
        setTrailerData(null);
      }
      console.log("Trailer is hereeeeee", response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleMovieClick = (movieId: number) => {
    console.log(movieId, "idddddd");
    getTrailerData(movieId);
  };

  const handleTrailerClose = () => {
    setTrailerData(null);
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
        const director = await axios.get(
          `${TMDB_BASE_URL}/movie/${id}/credits?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${TMDB_API_TOKEN}`,
            },
          }
        );
        const credits = await axios.get(
          `${TMDB_BASE_URL}/movie/${id}/credits?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${TMDB_API_TOKEN}`,
            },
          }
        );
        setCredits(credits.data.cast as CastMember[]);
        console.log(credits.data.cast, "credits");
        setMovieGuide(response.data);
        setDirector(director.data.crew);
        console.log(director.data, "directors");
        const directors = director.data.crew.filter(
          (name: { job: string }) => name.job === "Director"
        );

        if (directors.length > 0) {
          setDirector(directors[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchMovieDetails();
  }, [id]);

  return (
    <div className="flex flex-col items-center">
      <div className="lg:hidden">
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
          <div
            className="absolute bottom-3 left-3 flex items-center gap-2 z-50"
            onClick={() => handleMovieClick(movieGuide?.id as number)}
          >
            <div className="bg-white w-[40px] h-[40px] flex items-center justify-center rounded-full  ">
              <Play className="w-4 h-4 text-black" />
            </div>
            <p className="text-white font-normal text-base">Play trailer</p>
          </div>
        </div>

        <div className="flex px-5 py-5">
          <div className="h-[148px] w-[100px] min-h-[148px] min-w-[100px]">
            <Image
              src={`https://image.tmdb.org/t/p/w1280${movieGuide?.poster_path}`}
              width={100}
              height={148}
              alt="Picture of the author"
            />
          </div>
          <div className="flex flex-col ml-5">
            <div className="flex gap-1">
              {movieGuide &&
                movieGuide.genres.map((genre: { id: number; name: string }) => (
                  <div
                    className="rounded-full py-[2px] px-[10px] mb-5 h-[20px] font-semibold text-xs border border-gray-400 flex items-center justify-center flex-wrap"
                    key={genre.id}
                  >
                    {genre.name}
                  </div>
                ))}
            </div>
            <div>{movieGuide && movieGuide.overview}</div>
          </div>
        </div>
        <div className="p-5 flex flex-col gap-5">
          <div className="flex gap-10 border-b-[1px] pb-1">
            <strong>Director</strong>
            <div>{director && director.original_name}</div>
          </div>
          <div className="flex gap-10 border-b-[1px] pb-1">
            <strong>Writers</strong>
          </div>
          <div className="flex gap-[61px] border-b-[1px] pb-1">
            <strong>Stars</strong>
            <div>
              {credits &&
                credits.slice(0, 5).map((cast: CastMember, index: number) => (
                  <span key={cast.id}>
                    {cast.original_name}
                    {index < 4 && " · "}{" "}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>

      {trailerData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative">
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={handleTrailerClose}
            >
              X
            </button>
            <iframe
              src={trailerData}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              width="560"
              height="315"
              max-width="560"
              min-width="315"
              min-heaght="200"
              max-height="315"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      <div className="hidden lg:block max-w-[1080px] w-[100%] min-w-[768px]">
        <div className="flex justify-between p-5">
          <div className="justify-start items-center text-4xl font-bold">
            {movieGuide && movieGuide.title}{" "}
            <div className="flex items-center gap-1">
              <div className="flex text-lg font-normal ">
                {movieGuide && movieGuide.release_date}
              </div>
              {"·"} <p className="text-lg font-normal">PG</p>
              {"·"}
              <div className="flex text-lg font-normal">
                {movieGuide && movieGuide.runtime
                  ? formatRuntime(movieGuide.runtime)
                  : null}
              </div>
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <Star className="fill-yellow-400 text-yellow-400 h-7 w-7" />
            <div className="flex flex-col text-base font-normal">
              <div>{movieGuide && movieGuide.vote_average}/10</div>
              <div>{movieGuide && movieGuide.vote_count}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-between ml-5">
          <div className="h-[428px] w-[290px] min-h-[427px] min-w-[289px]">
            <Image
              src={`https://image.tmdb.org/t/p/w1280${movieGuide?.poster_path}`}
              width={290}
              height={428}
              alt="Picture of the author"
            />
          </div>

          <div className="w-[760px] h-[428px] max-w-[760px] max-h-[428px] relative">
            <Image
              src={`https://image.tmdb.org/t/p/w1280${movieGuide?.backdrop_path}`}
              width={760}
              height={428}
              alt="Picture of the author"
            />
            <div
              onClick={() => handleMovieClick(movieGuide?.id as number)}
              className="absolute bottom-5 left-5 flex items-center gap-2"
            >
              <div className="bg-white w-[40px] h-[40px] flex items-center justify-center rounded-full  ">
                <Play className="w-4 h-4 text-black" />
              </div>
              <p className="text-white font-normal text-base">Play trailer</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-5 mt-8">
          <div className="flex gap-1">
            {movieGuide &&
              movieGuide.genres.map((genre: { id: number; name: string }) => (
                <div
                  className="rounded-full py-[2px] px-[10px] mb-5 h-[20px] font-semibold text-xs border border-gray-400 flex items-center justify-center flex-wrap"
                  key={genre.id}
                >
                  {genre.name}
                </div>
              ))}
          </div>
          <div>{movieGuide && movieGuide.overview}</div>
        </div>
        <div className="p-5 flex flex-col gap-5">
          <div className="flex gap-10 border-b-[1px] pb-1">
            <strong>Director</strong>
            <div>{director && director.original_name}</div>
          </div>
          <div className="flex gap-10 border-b-[1px] pb-1">
            <strong>Writers</strong>
          </div>
          <div className="flex gap-[61px] border-b-[1px] pb-1">
            <strong>Stars</strong>
            <div>
              {credits &&
                credits.slice(0, 5).map((cast: CastMember, index: number) => (
                  <span key={cast.id}>
                    {cast.original_name}
                    {index < 4 && " · "}{" "}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieGuideCard;
