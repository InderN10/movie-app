"use client";
import CarouselSlider from "@/components/my-component/CarouselSlider";
import UpcomingMovie from "@/components/my-component/UpcomingMovie";

export default function Home() {
 

  return (
    <div className=" w-screen">
      <CarouselSlider/>
      <UpcomingMovie/>
    </div>
  );
}
