import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const ProfileScreen = () => {
  const userData = {
    name: "Emily Johnson",
    username: "@emilyj",
    bio: "Digital designer & photographer. Love to travel and explore new cultures.",
    posts: 247,
    followers: 1258,
    following: 562,
    profilePic:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
  };

  const handleallUser = () => {
    router.push("/employee/employee");
  };
  const handleRegister = () => {
    router.push("/register");
  };
  const handleEditProfile = () => {
    router.push("/(drawer)");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      {/* <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View> */}

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={{ uri: userData.profilePic }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.username}>{userData.username}</Text>
          <Text style={styles.bio}>{userData.bio}</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.posts}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleEditProfile}
            style={styles.editButton}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Navigation Cards */}
        <View style={styles.navSection}>
          <Text style={styles.sectionTitle}>Community</Text>

          <TouchableOpacity style={styles.navCard} onPress={handleallUser}>
            <View style={styles.navCardContent}>
              <View style={[styles.navIcon, { backgroundColor: "#6C63FF" }]}>
                <Ionicons name="people-outline" size={24} color="#fff" />
              </View>
              <View style={styles.navTextContainer}>
                <Text style={styles.navTitle}>View All Employee</Text>
                <Text style={styles.navSubtitle}>Browse community members</Text>
              </View>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#999" />
          </TouchableOpacity>

          {/* Register */}
          <TouchableOpacity style={styles.navCard} onPress={handleRegister}>
            <View style={styles.navCardContent}>
              <View style={[styles.navIcon, { backgroundColor: "#6C63FF" }]}>
                <Ionicons name="people-outline" size={24} color="#fff" />
              </View>
              <View style={styles.navTextContainer}>
                <Text style={styles.navTitle}>Register</Text>
                <Text style={styles.navSubtitle}>
                  Store Data in Asyns Storage
                </Text>
              </View>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#999" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa"
    // paddingTop: 50
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333"
  },
  profileSection: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 10
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 5
  },
  username: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10
  },
  bio: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
    paddingHorizontal: 20
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 20
  },
  statItem: {
    alignItems: "center"
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 5
  },
  statLabel: {
    fontSize: 14,
    color: "#777"
  },
  editButton: {
    backgroundColor: "#6C63FF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: "80%",
    alignItems: "center"
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  },
  navSection: {
    backgroundColor: "#fff",
    padding: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 15
  },
  navCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10
  },
  navCardContent: {
    flexDirection: "row",
    alignItems: "center"
  },
  navIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15
  },
  navTextContainer: {
    justifyContent: "center"
  },
  navTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 3
  },
  navSubtitle: {
    fontSize: 13,
    color: "#777"
  }
});

export default ProfileScreen;
