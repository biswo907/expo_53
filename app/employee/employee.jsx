import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ScrollWrapper from "../../components/scrollWrapper";

const dummyEmployees = Array.from({ length: 20 }, (_, i) => ({
  id: String(i + 1),
  name: `Employee ${i + 1}`,
  role: [
    "Software Engineer",
    "Project Manager",
    "UI/UX Designer",
    "QA Analyst"
  ][i % 4],
  email: `employee${i + 1}@example.com`,
  phone: `+123456789${i}`
}));

export default function EmployeeList() {
  const router = useRouter();

  const handlePress = (employee) => {
    router.push({
      pathname: `/employee/[id]`,
      params: { ...employee } // pass full object as params
    });
  };

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
        <Text style={styles.headerTitle}>Employee</Text>
      </View>

      {dummyEmployees.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          onPress={() => handlePress(item)}
        >
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.role}>{item.role}</Text>
        </TouchableOpacity>
      ))}
    </ScrollWrapper>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 0, paddingTop: 0, paddingBottom: 0 },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  name: { fontSize: 18, fontWeight: "600", marginBottom: 4 },
  role: { fontSize: 14, color: "#555" },
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
