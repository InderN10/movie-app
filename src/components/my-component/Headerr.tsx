"use client";
import React from "react";
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
function Header() {
  const { setTheme, theme } = useTheme();
  return (
    <div className="mx-5 flex items-center justify-between my-5">
      <div className="flex gap-2 text-indigo-700 ">
        <Film />
        <p className="font-bold"> Movie Z</p>
      </div>
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
          <Input className="border-none text-3xl w-[100%] h-[10px] focus-visible:ring-0 shadow-none" />
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
  );
}

export default Header;
