import {Image, ScrollView, Text, View} from 'react-native';
import {Link} from "expo-router";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import {useRouter} from "expo-router";

export default function Index() {
    const router = useRouter();

    return (
        <View className=" flex-1 bg-primary">
            <Image source={images.bg} className="w-full absolute z-0" />
            <ScrollView className="flex-1 px-5"
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{flexGrow: 1 , paddingBottom: 10}}>
                <Image source={icons.logo} className="mx-auto mt-20 w-12 h-10 mb-5" />

                <View className="flex-1 mt-5">
                    <SearchBar

                        onPress={() => router.push("/search")}
                        placeholder="Search for a Movie"

                    />
                </View>

            </ScrollView>

        </View>
    );
}
