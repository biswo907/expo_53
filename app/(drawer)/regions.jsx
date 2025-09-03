import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function DynamicRegionWithAsync() {
  const [tree, setTree] = useState({ id: "root", name: "India", children: [] });
  const [currentParentId, setCurrentParentId] = useState("root");
  const [currentParentName, setCurrentParentName] = useState("India");
  const [inputVisible, setInputVisible] = useState(true);
  const [newNodeName, setNewNodeName] = useState("");
  const [expanded, setExpanded] = useState({ root: true });

  // Load saved data
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("dynamicRegions");
      if (saved) setTree(JSON.parse(saved));
    })();
  }, []);

  const saveToStorage = async (updatedTree) => {
    setTree(updatedTree);
    await AsyncStorage.setItem("dynamicRegions", JSON.stringify(updatedTree));
  };

  const addNode = () => {
    if (!newNodeName.trim()) {
      Alert.alert("Enter a valid name");
      return;
    }
    const updatedTree = { ...tree };
    const newNode = {
      id: `child_${Date.now()}`,
      name: newNodeName.trim(),
      children: []
    };
    insertNode(updatedTree, currentParentId, newNode);
    saveToStorage(updatedTree);
    setNewNodeName("");
    setInputVisible(false);
  };

  const insertNode = (node, parentId, newNode) => {
    if (node.id === parentId) {
      node.children.push(newNode);
      return true;
    }
    for (let child of node.children) {
      if (insertNode(child, parentId, newNode)) return true;
    }
    return false;
  };

  const deleteNode = (node, nodeId) => {
    node.children = node.children.filter((child) => child.id !== nodeId);
    for (let child of node.children) {
      deleteNode(child, nodeId);
    }
  };

  const handleDelete = (nodeId) => {
    const updatedTree = { ...tree };
    deleteNode(updatedTree, nodeId);
    saveToStorage(updatedTree);
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderTree = (node, level = 0) => {
    const isExpanded = expanded[node.id] ?? true;
    return (
      <View key={node.id} style={{ marginLeft: level * 12, marginVertical: 6 }}>
        <View style={styles.nodeCard}>
          <TouchableOpacity
            style={styles.nodeMainRow}
            onPress={() => toggleExpand(node.id)}
            activeOpacity={0.7}
          >
            {node.children.length > 0 ? (
              <Ionicons
                name={isExpanded ? "chevron-down" : "chevron-forward"}
                size={18}
                color="#333"
              />
            ) : (
              <Ionicons name="ellipse-outline" size={14} color="#999" />
            )}
            <Ionicons
              name="folder-outline"
              size={20}
              color={node.id === currentParentId ? "#007bff" : "#4cafef"}
              style={{ marginHorizontal: 4 }}
            />
            <Text
              style={[
                styles.nodeText,
                node.id === currentParentId && {
                  color: "#007bff",
                  fontWeight: "bold"
                }
              ]}
            >
              {node.name}
            </Text>
          </TouchableOpacity>

          <View style={styles.nodeActions}>
            <TouchableOpacity
              onPress={() => {
                setCurrentParentId(node.id);
                setCurrentParentName(node.name);
                setInputVisible(true);
              }}
              style={styles.actionIcon}
            >
              <Ionicons name="add-circle-outline" size={22} color="green" />
            </TouchableOpacity>
            {node.id !== "root" && (
              <TouchableOpacity
                onPress={() => handleDelete(node.id)}
                style={styles.actionIcon}
              >
                <Ionicons name="trash-outline" size={22} color="red" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {isExpanded &&
          node.children.map((child) => renderTree(child, level + 1))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        <Ionicons name="flag-outline" size={22} color="#4cafef" /> Country:
        India
      </Text>

      {renderTree(tree)}

      {inputVisible && (
        <View style={styles.card}>
          <Text style={styles.inputLabel}>
            Adding under: {currentParentName}
          </Text>
          <View style={styles.inputRow}>
            <Ionicons name="create-outline" size={20} color="#4cafef" />
            <TextInput
              placeholder="Enter name"
              value={newNodeName}
              onChangeText={setNewNodeName}
              style={styles.input}
            />
            <TouchableOpacity style={styles.okButton} onPress={addNode}>
              <Ionicons
                name="checkmark-circle-outline"
                size={22}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => {
          saveToStorage(tree);
          Alert.alert("Saved!", "Data stored successfully.");
        }}
      >
        <Ionicons name="save-outline" size={22} color="#fff" />
        <Text style={styles.saveText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f6f9",
    paddingBottom: 80
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333"
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4
  },
  inputLabel: {
    marginBottom: 6,
    color: "#555",
    fontWeight: "600"
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 6,
    backgroundColor: "#fafafa"
  },
  okButton: {
    backgroundColor: "#4cafef",
    padding: 10,
    borderRadius: 8
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 12,
    marginTop: 20,
    elevation: 3
  },
  saveText: { color: "#fff", fontSize: 18, fontWeight: "bold", marginLeft: 6 },
  nodeCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  nodeMainRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  nodeText: {
    fontSize: 16,
    marginLeft: 6,
    color: "#333",
    flexShrink: 1
  },
  nodeActions: {
    flexDirection: "row",
    alignItems: "center"
  },
  actionIcon: {
    marginLeft: 8
  }
});
