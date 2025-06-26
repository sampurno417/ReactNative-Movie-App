import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import useFetch from "@/services/useFetch";
import {fetchMovieDetails, fetchYtsTorrent} from "@/services/api";
import {router, useLocalSearchParams, useNavigation} from "expo-router";
import {icons} from "@/constants/icons";
import {getStreamingLink} from "@/services/fmovies";

interface MovieInfoProps {
    label: string;
    value: string|null|number;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
    <View className="flex-col items-start justify-center mt-5">
        <Text className=" text-white text-sm font-normal">
            {label}
        </Text>
        <Text className="text-light-100 font-bold text-sm mt-2 ">
            {value || 'N/A'}
        </Text>

    </View>
)

async function torrentUrlToMagnet(torrentUrl: any) {
    
}

const MovieDetails = () => {

    // const navigation = useNavigation();

    // useLayoutEffect(() => {
    //     navigation.setOptions({ headerShown: false });
    // }, []);

    const { id } = useLocalSearchParams();

    const {data : movie , loading} = useFetch(() => fetchMovieDetails(id as string));


  return (
    <View className=" flex-1 bg-primary">
      <ScrollView contentContainerStyle={{paddingBottom: 80}}>
          <View>
              <Image source={{uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`}} className="w-full h-[550px] items-center  " resizeMode="stretch"/>

              <View className="items-center mt-4">
                  <TouchableOpacity
                      onPress={async () => {
                          console.log("▶️ Play button tapped");

                          if (!movie?.title) {
                              console.warn("⚠️ No movie title found");
                              return;
                          }

                          console.log("🔍 Fetching torrent URL for:", movie.title);
                          const torrentUrl = await fetchYtsTorrent(movie.title, movie.release_date?.split("-")[0]);
                          if (!torrentUrl) {
                              alert("❌ No torrent found.");
                              return;
                          }
                          console.log("✅ Torrent URL:", torrentUrl);

                          console.log("🔁 Converting to magnet via backend...");
                          const magnetRes = await fetch(`https://tor-stream-api.onrender.com/magnet?torrent=${encodeURIComponent(torrentUrl)}`);
                          const magnetJson = await magnetRes.json();
                          const magnet = magnetJson.magnet;

                          if (!magnet || magnet === "magnet:?") {
                              alert("❌ Failed to convert to magnet link.");
                              return;
                          }

                          console.log("✅ Magnet:", magnet);

                          router.push({
                              pathname: "/movies/play",
                              params: { magnet: encodeURIComponent(magnet) }
                          });

                          console.log("🚀 Navigated to play screen");
                      }}



                      className="bg-accent px-5 py-3 rounded-full flex-row items-center"
                  >
                      <Image source={icons.play} className="w-5 h-5 mr-2" tintColor="white" />
                      <Text className="text-white text-base font-semibold">Play Movie</Text>
                  </TouchableOpacity>
              </View>


          </View>
          <View className= "flex-col  justify-center mt-5 px-5">

              <Text className="text-white text-xl font-bold" >
                  {movie?.title}
              </Text>

              <View className= "flex-row items-center gap-x-1 mt-2">
                  <Text className= "text-light-200 text-sm">

                      {movie?.release_date?.split('-')[0]}

                  </Text>

                  <Text className= "text-light-200 text-sm">
                      {movie?.runtime}m
                  </Text>
              </View>
              <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2 self-start">
                  <Image source={icons.star} className="size-4"/>
                  <Text className="text-white font-bold text-sm"> {Math.round(movie?.vote_average??0)}/10 </Text>
                  <Text className="text-light-200 text-sm"> ({movie?.vote_count} votes) </Text>
              </View>
              <MovieInfo label="Overview" value={movie?.overview} />
              <MovieInfo label="Genres" value={movie?.genres.map((g) => g.name).join(' - ') || 'N/A'} />
              <View className=" flex-row  items-start gap-x-6 mt-1/2">
                  <MovieInfo label={"Budget"} value={`$${movie?.budget / 1000000} million`} />
                  <MovieInfo label={"Revenue"} value={`$${Math.round(movie?.revenue / 1000000)} million`} />
              </View>
              <MovieInfo label={"Production Companies"} value={movie?.production_companies.map((c) => c.name).join(' - ') || 'N/A'} />
          </View>
      </ScrollView>
        {/*<TouchableOpacity className = "absolute left-0 right-0 bottom-5 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50" onPress={router.back} >*/}
        {/*    <Image source={icons.arrow} className="size-5 mr-1 mt-0.5 rotate-180" tintColor="ffffff" />*/}
        {/*    <Text className="text-white text-base font-semibold">Go Back</Text>*/}
        {/*</TouchableOpacity>*/}



    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({});
