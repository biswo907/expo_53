import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ScrollWrapper from "../../components/scrollWrapper";

export default function EmployeeDetails() {
  const params = useLocalSearchParams(); // receive full object
  const { name, role, email, phone } = params;
  const router = useRouter();

  return (
    <ScrollWrapper
      bodyColor="#f2f4f7"
      statusBarColor="#007bff"
      statusBarStyle="light-content"
      contentContainerStyle={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Employee Details</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>{role}</Text>
        <Text style={styles.info}>Email: {email}</Text>
        <Text style={styles.info}>Phone: {phone}</Text>
      </View>
    </ScrollWrapper>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 0, paddingTop: 0, paddingBottom: 40 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 20,
    textAlign: "center"
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  name: { fontSize: 20, fontWeight: "600", marginBottom: 5 },
  role: { fontSize: 16, color: "#555", marginBottom: 10 },
  info: { fontSize: 14, color: "#555", marginBottom: 5 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff", // red header
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 15
  },
  backBtn: {
    marginRight: 10,
    padding: 4
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff"
  }
});
