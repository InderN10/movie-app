"use client";
import React from "react";
import { Film, Search, Moon, Sun, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useTheme } from "next-themes";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
              <div className="flex flex-col gap-4">
                <DropdownMenuSeparator />
                <div className="flex gap-4">
                  <DropdownMenuItem className="rounded-full  h-[20px] font-semibold text-xs border border-gray-400">
                    Action <ChevronRight />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-full  h-[20px] font-semibold text-xs border border-gray-400">
                    Adventure <ChevronRight />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-full  h-[20px] font-semibold text-xs border border-gray-400">
                    Animation <ChevronRight />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-full  h-[20px] font-semibold text-xs border border-gray-400">
                    Biography <ChevronRight />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-full  h-[20px] font-semibold text-xs border border-gray-400">
                    Comedy <ChevronRight />
                  </DropdownMenuItem>
                </div>
                <div className="flex gap-4">
                  <DropdownMenuItem className="rounded-full  h-[20px] font-semibold text-xs border border-gray-400">
                    Crime <ChevronRight />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-full  h-[20px] font-semibold text-xs border border-gray-400">
                    Documentary <ChevronRight />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-full  h-[20px] font-semibold text-xs border border-gray-400">
                    Drama <ChevronRight />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-full  h-[20px] font-semibold text-xs border border-gray-400">
                    Family <ChevronRight />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-full  h-[20px] font-semibold text-xs border border-gray-400">
                    Fantasy <ChevronRight />
                  </DropdownMenuItem>
                </div>
                <div className="flex gap-4">
                  <DropdownMenuItem className="rounded-full  h-[20px] font-semibold text-xs border border-gray-400">
                    Film-Noir <ChevronRight />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-full  h-[20px] font-semibold text-xs border border-gray-400">
                    Game-Show <ChevronRight />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-full  h-[20px] font-semibold text-xs border border-gray-400">
                    History <ChevronRight />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-full  h-[20px] font-semibold text-xs border border-gray-400">
                    Horror <ChevronRight />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-full  h-[20px] font-semibold text-xs border border-gray-400">
                    Music <ChevronRight />
                  </DropdownMenuItem>
                </div>
                <div className="flex gap-4">
                  <DropdownMenuItem className="rounded-full  h-[20px] font-semibold text-xs border border-gray-400">
                    Musical <ChevronRight />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-full  h-[20px] font-semibold text-xs border border-gray-400">
                    Mystery <ChevronRight />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-full  h-[20px] font-semibold text-xs border border-gray-400">
                    News <ChevronRight />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-full  h-[20px] font-semibold text-xs border border-gray-400">
                    Reality-TV <ChevronRight />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-full  h-[20px] font-semibold text-xs border border-gray-400">
                    Romance <ChevronRight />
                  </DropdownMenuItem>
                </div>
                <div className="flex gap-4">
                  <DropdownMenuItem className="rounded-full  h-[20px] font-semibold text-xs border border-gray-400">
                    Sci-Fi <ChevronRight />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-full  h-[20px] font-semibold text-xs border border-gray-400">
                    Short <ChevronRight />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-full  h-[20px] font-semibold text-xs border border-gray-400">
                    Sport <ChevronRight />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-full h-[20px] font-semibold text-xs border border-gray-400">
                    Talk-Show <ChevronRight />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-full  h-[20px] font-semibold text-xs border border-gray-400">
                    Thriller <ChevronRight />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-full  h-[20px] font-semibold text-xs border border-gray-400">
                    War <ChevronRight />
                  </DropdownMenuItem>
                </div>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="hidden md:items-center md:flex md:w-[379px] rounded-[8px] md:border md:border-gray-400 md:px-2">
          <Search className="h-4 w-4"/>
          <Input className="hidden md:block md:w-full rounded-[8px] border-[0px] " />
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
