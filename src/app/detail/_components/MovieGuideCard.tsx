"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Movie } from "@/types/Movie-type";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
function MovieGuideCard() {
  const router = useParams();
  const { id } = router;

  const [movieGuide, setMovieGuide] = useState<Movie[]>([]);
  // const [director, setDirector] = useState<any>(null);
  // const [similarMovie, setSimilarMovie] = useState<any>(null);

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
        // const Director = await axios.get(
        //   `${TMDB_BASE_URL}/movie/${id}/credits?language=en-US`,
        //   {
        //     headers: {
        //       Authorization: `Bearer ${TMDB_API_TOKEN}`,
        //     },
        //   }
        // );
        // const similarMovie = await axios.get(
        //   `${TMDB_BASE_URL}/movie/${id}/similar?language=en-US&page=1`,
        //   {
        //     headers: {
        //       Authorization: `Bearer ${TMDB_API_TOKEN}`,
        //     },
        //   }
        // );

        setMovieGuide(response.data);
        // setDirector(Director.data);
        // setSimilarMovie(similarMovie.data.results);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMovieDetails();
  }, [id]);

  return (
    <div>
      <div>
        {movieGuide.map((movie) => (
          <Card key={movie.id}></Card>
        ))}
      </div>
    </div>
  );
}

export default MovieGuideCard;
