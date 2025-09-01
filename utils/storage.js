import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveAsyncStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

export const getAsyncStorage = async key => {
  try {
    const storedValue = await AsyncStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
