import {ActivityIndicator, FlatList, Image, Pressable, ScrollView, Text, View} from 'react-native';
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import {useRouter} from "expo-router";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import MovieCard from "@/components/MovieCard";
import {getTrendingMovies} from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {
    const router = useRouter();
    const {
        data: trendingMovies,
        error: trendingError,
        loading: trendingLoading,

    } = useFetch(getTrendingMovies);
    const {data : movies , error: moviesError , loading: moviesLoading} = useFetch(() => fetchMovies({query: ''}));

    return (
        <View className=" flex-1 bg-primary">
            <Image source={images.bg} className="w-full absolute z-0" />
            <ScrollView className="flex-1 px-5"
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{flexGrow: 1 , paddingBottom: 10}}>
                <Image source={icons.logo} className="mx-auto mt-20 w-12 h-10 mb-5" />

                {moviesLoading || trendingLoading ?(
                    <ActivityIndicator
                        size="large"
                        color="#0000ff"
                        className="mt-10 self-center"
                    />
                ) : moviesError || trendingError ? (
                    <Text className="text-white text-center">Error: {moviesError?.message || trendingError?.message } </Text>
                ) : (
                    <View className="flex-1 mt-5">

                        <>
                            <SearchBar

                                onPress={() => router.push("/search")}
                                placeholder="Search for a Movie"

                            />

                        {trendingMovies && (
                            <View className= "mt-10">

                                <Text className="text-lg text-white font-bold mb-3">Trending Movies</Text>

                                <FlatList
                                    className="mb-4 mt-3"
                                    horizontal
                                    showsHorizontalScrollIndicator = {false}
                                    ItemSeparatorComponent = {() => <View
                                        className="w-4"
                                    />}
                                    data={trendingMovies} renderItem={({item, index}) =>(
                                    <TrendingCard
                                        movie={item} index={index}
                                    />
                                )}
                                    keyExtractor={(item) => item.movie_id.toString()}
                                          />

                            </View>
                        )}


                            <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>

                            <FlatList

                                data={movies}
                                renderItem={({item}) => (
                                    <MovieCard
                                        {...item}
                                    />
                                )}

                                keyExtractor={(item) => item.id.toString() }
                                numColumns={3}
                                columnWrapperStyle={{
                                    justifyContent: 'flex-start',
                                    gap: 20,
                                    paddingRight: 5,
                                    marginBottom: 10
                                }}
                                className="mt-2 pb-32"
                                scrollEnabled={false}
                            />
                        </>

                    </View>
                )}

            </ScrollView>

        </View>
    );
}
