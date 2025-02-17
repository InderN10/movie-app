"use client";
import CarouselSlider from "@/components/my-component/CarouselSlider";
import PopularMovie from "@/components/my-component/PopularMovie";
import TopRatedMovie from "@/components/my-component/TopRatedMovie";
import UpcomingMovie from "@/components/my-component/UpcomingMovie";

export default function Home() {

  return (
    <div className=" w-screen">
      <CarouselSlider/>
      <UpcomingMovie/>
      <PopularMovie/>
      <TopRatedMovie/>
    </div>
  );
}
