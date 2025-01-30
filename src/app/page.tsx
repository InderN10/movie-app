"use client";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Movie } from "@/types/Movie-type";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

export default function Home() {
  const [nowPlayingData, setNowPlayingData] = useState<Movie[]>([]);
  const getMovieData = async () => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/popular?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      console.log(response);
      setNowPlayingData(response.data.results)
    } catch (err) {
      console.log(err);
    }
  };
  const getNowPlayingMovieData = async () => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/now_playing?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      console.log("this is now laying", response.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovieData();
    getNowPlayingMovieData();
  }, []);

  return (
    <div className="h-screen w-screen">
      <div>
        <Card>
          <CardHeader>
            <CardTitle>{nowPlayingData}</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
