import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = () => {
  const range = {
    latitude: 20.2961, // Bhubaneswar Latitude
    longitude: 85.8189, // Bhubaneswar Longitude
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} />

      {/* Map view with initial region set to Bhubaneswar */}
      <MapView style={styles.map} initialRegion={range}>
        <Marker
          coordinate={{ latitude: 20.2961, longitude: 85.8189 }}
          title="Bhubaneswar"
          description="Capital city of Odisha, India"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1 // Ensure the container takes up the full screen height
    // backgroundColor: "red" // Set background color for visibility
  },
  map: {
    flex: 1
  },
  gestureContainer: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    padding: 16
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 18,
    fontWeight: "bold"
  }
});

export default MapScreen;
