import {ActivityIndicator, FlatList, Image, ScrollView, Text, View} from 'react-native';
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import {useRouter} from "expo-router";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";

export default function Index() {
    const router = useRouter();
    const {data : movies , error: moviesError , loading: moviesLoading} = useFetch(() => fetchMovies({query: ''}));

    return (
        <View className=" flex-1 bg-primary">
            <Image source={images.bg} className="w-full absolute z-0" />
            <ScrollView className="flex-1 px-5"
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{flexGrow: 1 , paddingBottom: 10}}>
                <Image source={icons.logo} className="mx-auto mt-20 w-12 h-10 mb-5" />

                {moviesLoading?(
                    <ActivityIndicator
                        size="large"
                        color="#0000ff"
                        className="mt-10 self-center"
                    />
                ) : moviesError ? (
                    <Text className="text-white text-center">Error: {moviesError?.message} </Text>
                ) : (
                    <View className="flex-1 mt-5">
                        <SearchBar

                            onPress={() => router.push("/search")}
                            placeholder="Search for a Movie"

                        />

                        <>
                            <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>

                            <FlatList
                                data={movies}
                                renderItem={({item}) => (
                                    <Text className="text-white text-sm">{item.title}</Text>
                                )}
                            />
                        </>

                    </View>
                )}

            </ScrollView>

        </View>
    );
}
