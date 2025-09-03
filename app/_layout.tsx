import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="mapScreen" options={{ title: "Map" }} />
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
    </Stack>
  );
}
