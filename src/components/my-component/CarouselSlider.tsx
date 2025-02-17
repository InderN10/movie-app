"use client";
import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import axios from "axios";
import { Movie } from "@/types/Movie-type";
import Autoplay from "embla-carousel-autoplay";
import { Skeleton } from "../ui/skeleton";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

function CarouselSlider() {
  const [nowPlayingData, setNowPlayingData] = useState<Movie[]>([]);
  const [trailerData, setTrailerData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getNowPlayingMovieData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/now_playing?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setNowPlayingData(response.data.results);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
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
    getNowPlayingMovieData();
  }, []);

  return (
    <div>
      <div className="md:hidden">
        {loading && <Skeleton className="h-[100%] w-[100%] rounded-xl" />}
        <Carousel
          className="w-screen flex flex-col p-0 "
          opts={{
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
        >
          <CarouselContent>
            {nowPlayingData.slice(0, 10).map((movie) => (
              <CarouselItem key={movie.id}>
                <Card>
                  <CardContent className="flex  justify-center p-0">
                    <div className="">
                      <Image
                        src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                        width={1000}
                        height={250}
                        alt="Picture of the author"
                      />
                      <div className="p-5">
                        <div className="flex justify-between">
                          <div>
                            <p>Now playing:</p>
                            <h3 className="font-semibold text-2xl">
                              {movie.title}
                            </h3>
                          </div>
                          <div className="flex gap-1 items-center">
                            <Star className="text-yellow-400 w-7 h-7 fill-yellow-400" />
                            {movie.vote_average}/10
                          </div>
                        </div>
                        <div>
                          <p className="font-normal text-sm leading-5 my-4 h-[100px] overflow-hidden overflow-y-auto">
                            {movie.overview}
                          </p>
                        </div>
                        <Button onClick={() => handleMovieClick(movie.id)}>
                          <Play />
                          Watch trailer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
        </Carousel>
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

      <div className="hidden md:block">
        {loading && <Skeleton className="h-[100%] w-[100%] rounded-xl" />}
        <Carousel
          className="w-screens max-h-[600px] flex flex-col p-0 "
          opts={{
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
        >
          <CarouselContent>
            {nowPlayingData.slice(0, 10).map((movie) => (
              <CarouselItem key={movie.id}>
                <div>
                  <Card>
                    <CardContent className="p-0 ">
                      <div className="">
                        {loading && (
                          <Skeleton className="h-[100%] w-[100%] rounded-xl" />
                        )}
                        <Image
                          src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                          width={10000}
                          height={10000}
                          alt="Picture of the author"
                          className="absolute "
                        />
                        <div className="p-5 relative top-0 left-0 min-h-[500px] w-screen flex flex-col justify-center ml-40">
                          <div className="flex flex-col gap-3">
                            <div className="text-white">
                              <p>Now playing:</p>
                              <h3 className="font-semibold text-2xl">
                                {movie.title}
                              </h3>
                            </div>
                            <div className="flex gap-1 items-center text-white">
                              <Star className="text-yellow-400 w-7 h-7 fill-yellow-400" />
                              {movie.vote_average}/10
                            </div>
                          </div>
                          <div>
                            <p className="font-normal text-sm leading-5 my-4 w-[302px] h-[100px] overflow-hidden overflow-y-auto text-white">
                              {movie.overview}
                            </p>
                          </div>
                          <div>
                            <Button onClick={() => handleMovieClick(movie.id)}>
                              <Play />
                              Watch trailer
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
        </Carousel>
      </div>
    </div>
  );
}
export default CarouselSlider;
