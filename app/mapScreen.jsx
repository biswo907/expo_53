import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

const MapScreen = () => {
  const [coords, setCoords] = useState(null);
  const [address, setAddress] = useState("Fetching location...");

  // Function 1: Get latitude & longitude
  async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setAddress("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setCoords(location.coords);
    console.log("LOCATION----", location);

    // Fetch address once coords available
    if (location.coords) {
      getAddress(location.coords.latitude, location.coords.longitude);
    }
  }

  // Function 2: Convert lat/lon to address
  async function getAddress(lat, lon) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
        {
          headers: {
            "User-Agent": "expo-app/1.0" // required by Nominatim
          }
        }
      );

      const text = await response.text(); // first, check if it's JSON or HTML
      try {
        const data = JSON.parse(text);
        if (data?.display_name) {
          setAddress(data.display_name);
          console.log("Address", data);
        } else {
          setAddress("Unable to fetch address");
        }
      } catch (jsonError) {
        console.log("RAW RESPONSE:", text.slice(0, 200)); // preview first 200 chars
        setAddress("Invalid JSON response (server blocked?)");
      }
    } catch (error) {
      console.log("ADDRESS ERROR:", error);
      setAddress("Error fetching address");
    }
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

  console.log("c", coords);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#007bff" }}>
      {/* Solid Blue StatusBar */}
      <StatusBar
        translucent={false}
        backgroundColor="#007bff"
        barStyle="light-content"
      />

      {/* Solid Red Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Map Screen</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Location Details Box */}
      <View style={styles.body}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Current Address</Text>
          <Text style={styles.cardDescription}>{address}</Text>
          {coords && (
            <Text style={styles.cardCoords}>
              Lat: {coords.latitude.toFixed(6)}, Lon:{" "}
              {coords.longitude.toFixed(6)}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.container}>
        {coords ? (
          <MapView
            style={styles.map}
            region={{
              latitude: coords.latitude,
              longitude: coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01
            }}
          >
            <Marker
              coordinate={{
                latitude: coords.latitude,
                longitude: coords.longitude
              }}
              title="My Location"
              description={address || "Fetching address..."}
            />
          </MapView>
        ) : (
          <Text style={{ color: "#fff" }}>Fetching location...</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15
    // backgroundColor: "#d9534f" // Red
  },
  backButton: {
    padding: 4
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff"
  },
  body: {
    // flex: 1,
    padding: 15,
    backgroundColor: "#f8f9fc"
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#333"
  },
  cardDescription: {
    fontSize: 14,
    color: "#666"
  },
  cardCoords: {
    fontSize: 12,
    color: "#999",
    marginTop: 8
  },
  //   map
  container: {
    flex: 1,
    backgroundColor: "#999",
    justifyContent: "center",
    alignItems: "center"
  },
  map: {
    width: "95%",
    height: "95%"
  }
});

export default MapScreen;
