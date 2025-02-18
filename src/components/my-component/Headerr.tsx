"use client";

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Film, Search, Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useTheme } from "next-themes";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Genres from "./Genres";
import Link from "next/link";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

function Header() {
  const { setTheme, theme } = useTheme();
  const [searchData, setSearchData] = useState<{ id: number; title: string }[]>(
    []
  );

  const getSearchData = async (searchValue: string) => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setSearchData(response.data.results);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(searchData, "search data");

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    getSearchData(event.target.value);
  }

  useEffect(() => {
    getSearchData("defaultSearchValue");
  }, []);

  return (
    <div className="">
      <div className="mx-5 flex items-center justify-between my-5 relative">
        <Link href={"/"}>
          <div className="flex gap-2 text-indigo-700 ">
            <Film />
            <p className="font-bold"> Movie Z</p>
          </div>
        </Link>
        <div className="hidden md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex gap-2 py-2 px-4 rounded-md border-gray-400 border">
                <ChevronDown />
                Genre
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <div className="mx-5 my-5 rounded-lg">
                <DropdownMenuLabel>
                  <p className="font-semibold text-2xl">Genres</p>
                  <p className="font-normal text-base">
                    See lists of movies by genre
                  </p>
                </DropdownMenuLabel>
                <Genres />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="hidden md:items-center md:flex md:w-[379px] rounded-[8px] md:border md:border-gray-400 md:px-2">
            <Search className="h-4 w-4" />
            <Input
              className="border-none text-3xl w-[100%] h-[10px] focus-visible:ring-0 shadow-none"
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant={"outline"} className="h-9 w-9 md:hidden">
            <Search />
          </Button>
          {theme === "dark" ? (
            <Button
              variant={"outline"}
              className="h-9 w-9"
              onClick={() => setTheme("light")}
            >
              <Sun />
            </Button>
          ) : (
            <Button
              variant={"outline"}
              className="h-9 w-9"
              onClick={() => setTheme("dark")}
            >
              <Moon />
            </Button>
          )}
        </div>
      </div>
      <div className="absolute left-0 bottom-0">
        {searchData &&
          searchData.slice(0, 5).map((movie) => (
            <div key={movie.id}>
              <div>
                <p>{movie.title}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Header;
