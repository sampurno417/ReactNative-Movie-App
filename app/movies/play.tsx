import { useLocalSearchParams } from "expo-router";
import {ResizeMode, Video} from "expo-av";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";

export default function PlayScreen() {
    const { magnet } = useLocalSearchParams<{ magnet: string }>();

    if (!magnet) {
        return (
            <View style={styles.center}>
                <Text className="text-white">No magnet link provided.</Text>
            </View>
        );
    }

    const streamUrl = `https://tor-stream-api.onrender.com/stream?magnet=${decodeURIComponent(magnet)}`;

    return (
        <View style={styles.container}>
            <Video
                source={{ uri: streamUrl }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                style={styles.video}
                shouldPlay
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    video: {
        flex: 1,
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
    },
});
