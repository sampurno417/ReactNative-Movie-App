import {ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {images} from "@/constants/images";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import MovieCard from "@/components/MovieCard";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import {func} from "ts-interface-checker";
import {updateSearchCount} from "@/services/appwrite";
import {useFocusEffect} from "expo-router";

const search = () => {

   const [searchQuery, setSearchQuery] = useState('');
    const {data : movies , error: moviesError , loading: moviesLoading, reFetch, reset} = useFetch(() => fetchMovies({query: searchQuery}), false);
    // const handleSearch = async (text: string) => {
    //     setSearchQuery(text);
    //     if (text.trim()) {
    //         await reFetch(); // ✅ handles the promise correctly
    //     }
    // };
    const inputRef = useRef<TextInput>(null); // ✅ ref to the input

    useEffect(() => {
        const timeoutId = setTimeout (async () => {
            if (searchQuery.trim()) {
                reFetch();
            }
            if (searchQuery.trim() && movies && movies.length > 0) {
                updateSearchCount(searchQuery, movies[0]);
            }
            else {
                reset();
            }
        }, 500);
        return () => clearTimeout(timeoutId);

    }, [searchQuery]);

    useFocusEffect(
        React.useCallback(() => {
            const timeout = setTimeout(() => {
                inputRef.current?.focus();
            }, 300); // small delay for keyboard smoothness

            return () => clearTimeout(timeout);
        }, [])
    );


    return (
      <View className="flex-1 bg-primary">
          <Image source={images.bg} className="w-full absolute z-0 resizeMode-cover flex-1 "/>

          <FlatList data={movies} renderItem={({item}) => <MovieCard {...item} /> }
                    keyExtractor={(item) => item.id.toString() }
                    numColumns={3}
                    columnWrapperStyle={{
                        justifyContent: 'flex-start',
                        gap: 20,
                        marginVertical: 16,

                    }}
                    className=" px-5"
                    contentContainerStyle={{paddingBottom: 100}}

                    ListHeaderComponent = {
                        <>
                            <View className="w-full flex-row justify-center items-center mt-20">
                                <Image source={icons.logo} className="w-12 h-10" />
                            </View>

                            <View className="mt-5">
                                <SearchBar placeholder={"Search Movies..."}
                                value={searchQuery}
                                onChangeText={(text: string) => setSearchQuery(text)}
                                //     onChangeText={handleSearch}
                                           inputRef={inputRef} // ✅ pass ref
                                />
                            </View>
                            {moviesLoading &&(
                                <ActivityIndicator size={"large"} color={"#0000ff"} className="my-3 self-center" />
                            )}

                            {moviesError && (
                                <Text className="text-red-800 px-5 my-3 text-center">Error: {moviesError?.message} </Text>
                            )}
                            {!moviesError && !moviesLoading && searchQuery.trim() && movies?.length > 0 &&
                                (
                                    <Text className="text-white text-xl mt-2 text-bold">Search Results for {''}
                                        <Text className="text-accent">
                                            {searchQuery}
                                        </Text>
                                    </Text>
                                )
                            }

                        </>
                    }

                    ListEmptyComponent = {
                        !moviesLoading && !moviesError ? (
                            <View className="mt-10 px-5">
                                <Text className="text-gray-500 text-center">
                                    {searchQuery.trim() ? "No results found" : "Search for a movie"}
                                </Text>
                            </View>
                        ) : null
                    }

          />

      </View>
  );
};

export default search;

