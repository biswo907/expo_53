// context/AuthContext.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUserLogin, setIsUserLogin] = useState(null); // null until checked
  const [loading, setLoading] = useState(true);

  // Check AsyncStorage when app starts
  useEffect(() => {
    const loadUser = async () => {
      try {
        const value = await AsyncStorage.getItem("isUserLogin");
        if (value === "true") {
          setIsUserLogin(true);
        } else {
          setIsUserLogin(false);
        }
      } catch (error) {
        console.log("Error loading login status:", error);
        setIsUserLogin(false);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // Login function
  const login = async () => {
    await AsyncStorage.setItem("isUserLogin", "true");
    setIsUserLogin(true);
    router.replace("/home"); // navigate to home screen
  };

  // Logout function
  const logout = async () => {
    await AsyncStorage.setItem("isUserLogin", "false");
    setIsUserLogin(false);
    // Reset the navigation stack
    router.dismissAll();
    router.replace("/login");
  };

  return (
    <AuthContext.Provider value={{ isUserLogin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for easy usage
export const useAuth = () => useContext(AuthContext);
