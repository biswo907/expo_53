import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Screen!</Text>

      {/* Navigate to Map Screen */}
      <Button title="Go to Map" onPress={() => router.push("/mapScreen")} />

      {/* Navigate to Rapido  Map */}
      <View style={styles.spacer} />
      <Button title="Open Rapido Map" onPress={() => router.push("/rapido")} />

      {/* Navigate to Drawer Tabs */}
      <View style={styles.spacer} />
      <Button
        title="Open Tabs"
        onPress={() => router.push("/(drawer)/(tabs)/profile")}
      />

      {/* Navigate to Settings (Drawer) */}
      <View style={styles.spacer} />
      <Button
        title="Go to Settings"
        onPress={() => router.push("/(drawer)/settings")}
      />

      {/* Navigate to Regions (Drawer) */}
      <View style={styles.spacer} />
      <Button
        title="Go to Regions"
        onPress={() => router.push("/(drawer)/regions")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20
  },
  text: {
    fontSize: 18,
    color: "#333",
    marginBottom: 30
  },
  spacer: {
    height: 10 // spacing between buttons
  }
});
