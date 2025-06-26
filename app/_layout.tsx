import { Stack } from "expo-router";
import "./global.css";
import {StatusBar} from "react-native";
import { Buffer } from "buffer";
global.Buffer = global.Buffer || Buffer;

export default function RootLayout() {
  return(
<>
  <StatusBar hidden={true} />
  <Stack>
  <Stack.Screen
      name= "(tabs)"
      options={{ headerShown: false }}
  />
    <Stack.Screen
      name= "movies/[id]"
      options={{ headerShown: false ,
        presentation: "card"
    }}

      />

    <Stack.Screen
        name= "movies/play"
        options={{ headerShown: false ,
          presentation: "card"
        }}

    />
  </Stack>
</>
)}
