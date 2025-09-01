import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Drawer1({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Home</Text>
      <Text style={styles.subText}>
        This is your main dashboard inside the drawer navigation. Explore
        different sections by swiping from the left or tapping on the drawer
        menu.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(drawer)/settings")} // Change to your drawer screen name
      >
        <Text style={styles.buttonText}>Go to Next Screen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f8f9fa"
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#222"
  },
  subText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#555"
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  }
});
