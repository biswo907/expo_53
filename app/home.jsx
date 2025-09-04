import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ScrollWrapper from "../components/scrollWrapper";
import { useAuth } from "../context/AuthContext";

export default function HomeScreen() {
  const router = useRouter();

  const { isUserLogin, logout } = useAuth();

  // Define your navigation cards
  const menuItems = [
    { title: "Map", icon: "map-outline", route: "/mapScreen" },
    { title: "Map_NEW", icon: "map-outline", route: "/rapido" },
    {
      title: "Tabs",
      icon: "albums-outline",
      route: "/(drawer)/(tabs)"
    },
    {
      title: "Settings",
      icon: "settings-outline",
      route: "/(drawer)/settings"
    },
    { title: "Regions", icon: "location-outline", route: "/(drawer)/regions" },
    { title: "Vehicle", icon: "location-outline", route: "/vehicle" }
  ];

  return (
    <ScrollWrapper
      asFlatList
      handleWrapperStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
      flatListProps={{
        data: menuItems,
        keyExtractor: (item) => item.route,
        ListHeaderComponent: (
          <View>
            <Text style={styles.text}>Welcome to the Home Screen!</Text>
            <Text>{isUserLogin ? "✅ Logged In" : "❌ Logged Out"}</Text>
          </View>
        ),
        renderItem: ({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(item.route)}
            activeOpacity={0.8}
          >
            <Ionicons name={item.icon} size={28} color="#4A90E2" />
            <Text style={styles.cardText}>{item.title}</Text>
            <Ionicons name="chevron-forward-outline" size={20} color="#999" />
          </TouchableOpacity>
        ),
        contentContainerStyle: styles.list
      }}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 20,
    textAlign: "center"
  },
  list: {
    gap: 16 // spacing between cards
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3 // Android shadow
  },
  cardText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#333",
    fontWeight: "500"
  }
});
