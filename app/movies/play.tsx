// app/play.tsx

import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, View, StyleSheet, Text } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { useEffect, useRef, useState } from "react";

export default function PlayScreen() {
    const { streamUrl } = useLocalSearchParams<{ streamUrl?: string }>();
    const videoRef = useRef<Video>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (streamUrl) {
            setLoading(false);
        }
    }, [streamUrl]);

    if (!streamUrl) {
        return (
            <View style={styles.center}>
                <Text className="text-white text-lg">No stream URL provided.</Text>
            </View>
        );
    }

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#00ffcc" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Video
                ref={videoRef}
                source={{ uri: streamUrl }}
                style={styles.video}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                shouldPlay
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    video: {
        flex: 1,
    },
    center: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
    },
});
