import { Stack, router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider, useAuth } from "../context/AuthContext";

function RootNavigation() {
  const { isUserLogin, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (isUserLogin) {
        router.replace("/home"); // redirect to Home
      } else {
        router.replace("/login"); // redirect to Login
      }
    }
  }, [isUserLogin, loading]);

  if (loading) {
    // Optional splash/loader while checking AsyncStorage
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="mapScreen" options={{ title: "Map" }} />
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  );
}
