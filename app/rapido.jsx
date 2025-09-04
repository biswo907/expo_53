import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

const MapScreen = () => {
  const mapRef = useRef(null);

  const [coords, setCoords] = useState(null);
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);

  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  const [tripDetails, setTripDetails] = useState(null);

  // === CURRENT LOCATION ===
  async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;

    let location = await Location.getCurrentPositionAsync({});
    setCoords(location.coords);
    setFromLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      name: "My Current Location"
    });

    fetchAddress(location.coords.latitude, location.coords.longitude);
  }

  async function fetchAddress(lat, lon) {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
        { headers: { "User-Agent": "expo-app/1.0" } }
      );
      const data = await res.json();
      if (data?.display_name) setFromQuery(data.display_name);
    } catch (err) {
      console.log("ADDR ERROR:", err);
    }
  }

  // === AUTOCOMPLETE ===
  async function fetchSuggestions(query, setSuggestions) {
    if (!query.trim()) return setSuggestions([]);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=5`,
        { headers: { "User-Agent": "expo-app/1.0" } }
      );
      const data = await res.json();
      setSuggestions(data);
    } catch (err) {
      console.log("SUGGESTION ERROR:", err);
    }
  }

  function handleSelect(item, setQuery, setLoc, setSuggestions) {
    setQuery(item.display_name);
    setLoc({
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon),
      name: item.display_name
    });
    setSuggestions([]);
    mapRef.current?.animateToRegion(
      {
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lon),
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      },
      800
    );
  }

  // === TRIP DETAILS (DISTANCE & TIME) ===
  async function fetchTripDetails(from, to) {
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${from.longitude},${from.latitude};${to.longitude},${to.latitude}?overview=false`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const distanceKm = (route.distance / 1000).toFixed(2);
        const durationMin = Math.round(route.duration / 60);
        setTripDetails({
          distance: distanceKm,
          duration: durationMin
        });
      }
    } catch (err) {
      console.log("TRIP ERROR:", err);
    }
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (fromLocation && toLocation) {
      fetchTripDetails(fromLocation, toLocation);
    }
  }, [fromLocation, toLocation]);

  const customMapStylenew = [
    { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { featureType: "poi", stylers: [{ visibility: "off" }] },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#e0e0e0" }]
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [{ color: "blue" }]
    }
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#007bff" }}>
      <StatusBar
        translucent={false}
        backgroundColor="#007bff"
        barStyle="light-content"
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Map Screen</Text>
      </View>

      {/* Search Fields */}
      <View style={styles.searchContainer}>
        {/* From Field */}
        <View>
          <View style={styles.searchBox}>
            <Ionicons name="location-outline" size={18} color="#007bff" />
            <TextInput
              style={styles.input}
              placeholder="From..."
              value={fromQuery}
              onChangeText={(text) => {
                setFromQuery(text);
                fetchSuggestions(text, setFromSuggestions);
              }}
            />
          </View>
          {fromSuggestions.length > 0 && (
            <FlatList
              style={styles.suggestions}
              data={fromSuggestions}
              keyExtractor={(item) => item.place_id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.suggestionItem}
                  onPress={() =>
                    handleSelect(
                      item,
                      setFromQuery,
                      setFromLocation,
                      setFromSuggestions
                    )
                  }
                >
                  <Text>{item.display_name}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>

        {/* To Field */}
        <View>
          <View style={styles.searchBox}>
            <Ionicons name="flag-outline" size={18} color="red" />
            <TextInput
              style={styles.input}
              placeholder="To..."
              value={toQuery}
              onChangeText={(text) => {
                setToQuery(text);
                fetchSuggestions(text, setToSuggestions);
              }}
            />
          </View>
          {toSuggestions.length > 0 && (
            <FlatList
              style={styles.suggestions}
              data={toSuggestions}
              keyExtractor={(item) => item.place_id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.suggestionItem}
                  onPress={() =>
                    handleSelect(
                      item,
                      setToQuery,
                      setToLocation,
                      setToSuggestions
                    )
                  }
                >
                  <Text>{item.display_name}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </View>

      {/* Trip Details Box */}
      {tripDetails && (
        <View style={styles.tripCard}>
          <View style={styles.tripRow}>
            <Ionicons name="navigate" size={20} color="#007bff" />
            <Text style={styles.tripText}>From: {fromQuery}</Text>
          </View>
          <View style={styles.tripRow}>
            <Ionicons name="location" size={20} color="red" />
            <Text style={styles.tripText}>To: {toQuery}</Text>
          </View>
          <View style={styles.tripRow}>
            <Ionicons name="car-outline" size={20} color="#333" />
            <Text style={styles.tripText}>
              Distance: {tripDetails.distance} km | Time: {tripDetails.duration}{" "}
              min
            </Text>
          </View>
        </View>
      )}

      {/* Map */}
      <View style={styles.container}>
        {fromLocation ? (
          <MapView
            provider={PROVIDER_GOOGLE}
            customMapStyle={customMapStylenew}
            ref={mapRef}
            style={styles.map}
            region={{
              latitude: fromLocation.latitude,
              longitude: fromLocation.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05
            }}
          >
            <Marker coordinate={fromLocation} title="From">
              <View
                style={{
                  backgroundColor: "#007bff",
                  padding: 6,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: "#fff",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                  elevation: 4
                }}
              >
                <Ionicons name="location-sharp" size={20} color="#fff" />
              </View>
            </Marker>

            {toLocation && (
              <Marker coordinate={toLocation} title="To" pinColor="red" />
            )}
            {fromLocation && toLocation && (
              <Polyline
                coordinates={[fromLocation, toLocation]}
                strokeColor="#ff0000"
                strokeWidth={3}
              />
            )}
          </MapView>
        ) : (
          <Text style={{ color: "#fff" }}>Fetching location...</Text>
        )}

        {/* Floating button */}
        <TouchableOpacity
          style={styles.myLocationButton}
          onPress={() => {
            if (coords) {
              mapRef.current?.animateToRegion(
                {
                  latitude: coords.latitude,
                  longitude: coords.longitude,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05
                },
                800
              );
            }
          }}
        >
          <Ionicons name="locate" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007bff"
  },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#fff" },

  searchContainer: { marginHorizontal: 10, marginTop: 8 },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 6,
    elevation: 2
  },
  input: { flex: 1, height: 40, paddingHorizontal: 8 },
  suggestions: {
    backgroundColor: "#fff",
    borderRadius: 6,
    elevation: 2,
    marginBottom: 8,
    maxHeight: 120
  },
  suggestionItem: { padding: 10, borderBottomWidth: 0.5, borderColor: "#ddd" },

  tripCard: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 12,
    borderRadius: 12,
    elevation: 3
  },
  tripRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  tripText: { marginLeft: 8, fontSize: 14, color: "#333" },

  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  map: { width: "100%", height: "100%" },

  myLocationButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 50,
    elevation: 5
  }
});

export default MapScreen;
