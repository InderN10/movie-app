// "use client"
// import React from 'react'
// import { useState } from 'react';
// import axios from 'axios';

// const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
// const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
// function WatchTrailer() {

//      const [trailerData, setTrailerData] = useState<string | null>(null);
//      const getTrailerData = async (id: number) => {
//        try {
//          const response = await axios.get(
//            `${TMDB_BASE_URL}/movie/${id}/videos?language=en-US`,
//            {
//              headers: {
//                Authorization: `Bearer ${TMDB_API_TOKEN}`,
//              },
//            }
//          );
//         const trailers = response.data.results;
//         if(trailers.lenght > 0){
//             const youtubeTrailer = trailers.find(
//                 (trailer: { site: string; key: string }) => trailer.site === "YouTube"
//             );
//             if (youtubeTrailer){
//                 setTrailerData(`https://www.youtube.com/watch?v=${youtubeTrailer.key}`);
//             } else  {
//                 setTrailerData(null);
//             }
//         }


//          setTrailerData(response.data.results);
//          console.log("Trailer is hereeeeee", response);
         
//        } catch (err) {
//          console.log(err);
//        }
//      };
// const handleMovieClick = (movieId: number) => {
//     console.log(movieId, "idddddd");
//     getTrailerData(movieId);
//   };
//   return (
//     <div >

//     </div>
//   );
// }

// export default WatchTrailer
