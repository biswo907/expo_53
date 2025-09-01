import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: "#6200ee" },
        headerTintColor: "#fff",
        drawerActiveTintColor: "#6200ee",
        drawerLabelStyle: { fontSize: 18, color: "black" },
        drawerStyle: {
          backgroundColor: "white" // light white/gray color
        }
        // headerShown: false
      }}
    >
      <Drawer.Screen name="index" options={{ title: "Home" }} />
      <Drawer.Screen name="settings" options={{ title: "Settings" }} />
    </Drawer>
  );
}
