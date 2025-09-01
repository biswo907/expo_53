import { useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

export default function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>

      {/* Dark Mode Switch */}
      <View style={styles.optionRow}>
        <Text style={styles.optionText}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
          thumbColor={isDarkMode ? "#fff" : "#000"}
          trackColor={{ false: "#ccc", true: "#4caf50" }}
        />
      </View>

      {/* Notifications Switch */}
      <View style={styles.optionRow}>
        <Text style={styles.optionText}>Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          thumbColor={notificationsEnabled ? "#fff" : "#000"}
          trackColor={{ false: "#ccc", true: "#4caf50" }}
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8"
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333"
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2
  },
  optionText: {
    fontSize: 18,
    color: "#333"
  },
  saveButton: {
    marginTop: 30,
    backgroundColor: "#4caf50",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center"
  },
  saveButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold"
  }
});
