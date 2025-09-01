import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput
} from "react-native";
import { getAsyncStorage, saveAsyncStorage } from "../utils/storage";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    age: "",
    phone: "",
    city: ""
  });
  const [isloading, setIsLoading] = useState(false);

  // Fetch stored data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      const savedData = await getAsyncStorage("userForm");
      if (savedData) setForm(savedData);
    };
    fetchData();
  }, []);

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSave = async () => {
    console.log("Function Calll...........");

    setIsLoading(true);
    await saveAsyncStorage("userForm", form);
    setIsLoading(false);
    Alert.alert("Success", "Your information has been saved!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register User</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter username"
        value={form.username}
        onChangeText={(text) => handleChange("username", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter email"
        value={form.email}
        onChangeText={(text) => handleChange("email", text)}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter age"
        value={form.age}
        onChangeText={(text) => handleChange("age", text)}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter phone"
        value={form.phone}
        onChangeText={(text) => handleChange("phone", text)}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={form.city}
        onChangeText={(text) => handleChange("city", text)}
      />

      <Pressable
        style={styles.button}
        disabled={isloading}
        onPress={handleSave}
      >
        {isloading ? (
          <ActivityIndicator color={"white"} />
        ) : (
          <Text style={styles.buttonText}>Save</Text>
        )}
      </Pressable>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f0f4f8",
    justifyContent: "center"
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
    textAlign: "center"
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
    marginTop: 10
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  }
});
