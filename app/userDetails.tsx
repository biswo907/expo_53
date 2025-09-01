import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { useGetUserByIdQuery } from "../redux/services/api";

const UserDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: user, isLoading, isError } = useGetUserByIdQuery(id);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading user details...</Text>
      </View>
    );
  }

  if (isError || !user) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to load user details.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* User Basic Info */}
      <View style={styles.card}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>@{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.phone}>{user.phone}</Text>
        <Text style={styles.website}>🌐 {user.website}</Text>
      </View>

      {/* Company Info */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Company</Text>
        <Text style={styles.info}>{user.company.name}</Text>
        <Text style={styles.info}>{user.company.catchPhrase}</Text>
        <Text style={styles.info}>{user.company.bs}</Text>
      </View>

      {/* Address Info */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Address</Text>
        <Text style={styles.info}>
          {user.address.street}, {user.address.suite}
        </Text>
        <Text style={styles.info}>
          {user.address.city} - {user.address.zipcode}
        </Text>
        <Text style={styles.info}>
          Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}
        </Text>
      </View>
    </ScrollView>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555"
  },
  errorText: {
    fontSize: 16,
    color: "red"
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333"
  },
  username: {
    fontSize: 16,
    color: "#555",
    marginVertical: 2
  },
  email: {
    fontSize: 14,
    color: "#007bff",
    marginVertical: 2
  },
  phone: {
    fontSize: 14,
    color: "#333",
    marginVertical: 2
  },
  website: {
    fontSize: 14,
    color: "#28a745",
    marginTop: 4
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 6
  },
  info: {
    fontSize: 14,
    color: "#555",
    marginVertical: 2
  }
});
