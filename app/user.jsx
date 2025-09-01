import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useGetUsersQuery } from "../redux/services/api";

import { router } from "expo-router";

const User = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Fetching users...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          Failed to load users. Try again later.
        </Text>
      </View>
    );
  }
  const handlePress = (item) => {
    router.push(`/userDetails?id=${item.id}`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handlePress(item)}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
            <Text style={styles.phone}>{item.phone}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9"
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
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333"
  },
  email: {
    fontSize: 14,
    color: "#555",
    marginTop: 4
  },
  phone: {
    fontSize: 14,
    color: "#777",
    marginTop: 2
  },
  separator: {
    height: 12
  }
});
