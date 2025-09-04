import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import ScrollWrapper from "../components/scrollWrapper";

const VEHICLE_OPTIONS = [
  { id: "veh-1", name: "Truck" },
  { id: "veh-2", name: "JCB" },
  { id: "veh-3", name: "Bus" },
  { id: "veh-4", name: "Car" }
];

const VARIANTS = ["Mini", "Large"];

export default function VehiclePage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVehicles, setSelectedVehicles] = useState({});
  const [vehicleCards, setVehicleCards] = useState({});

  const makeSectionId = (vehName) => vehName.toLowerCase() + "01";

  const makeItemId = (vehName, variant, index) =>
    `${vehName.toLowerCase()}-${variant.toLowerCase()}-${index + 1}`;

  const toggleVehicle = (vehicle) => {
    console.log("VEHICLE", vehicle);

    const sectionId = makeSectionId(vehicle.name);

    if (selectedVehicles[sectionId]) {
      const updated = { ...selectedVehicles };
      delete updated[sectionId];
      setSelectedVehicles(updated);

      const updatedCards = { ...vehicleCards };
      delete updatedCards[sectionId];
      setVehicleCards(updatedCards);
    } else {
      setSelectedVehicles({
        ...selectedVehicles,
        [sectionId]: { ...vehicle, sectionId, variants: {} }
      });
    }
  };

  const changeQuantity = (sectionId, vehName, variant, delta) => {
    const vehicle = selectedVehicles[sectionId];
    if (!vehicle) return;

    const currentCount = vehicle.variants[variant]?.count || 0;
    const newCount = Math.max(0, currentCount + delta);

    const updatedVariants = {
      ...vehicle.variants,
      [variant]: { count: newCount }
    };

    setSelectedVehicles({
      ...selectedVehicles,
      [sectionId]: { ...vehicle, variants: updatedVariants }
    });

    const cards = {};
    Object.values({
      ...selectedVehicles,
      [sectionId]: { ...vehicle, variants: updatedVariants }
    }).forEach((veh) => {
      const secId = veh.sectionId;
      cards[secId] = [];
      Object.entries(veh.variants).forEach(([varnt, obj]) => {
        for (let i = 0; i < (obj.count || 0); i++) {
          cards[secId].push({
            id: makeItemId(veh.name, varnt, i),
            sectionId: secId,
            type: veh.name,
            variant: varnt,
            vehicleNo: "",
            vehicleName: ""
          });
        }
      });
    });

    setVehicleCards(cards);
  };

  const updateCardField = (sectionId, cardId, field, value) => {
    setVehicleCards((prev) => ({
      ...prev,
      [sectionId]: prev[sectionId].map((c) =>
        c.id === cardId ? { ...c, [field]: value } : c
      )
    }));
  };

  const handleSubmit = () => {
    const result = {};
    Object.entries(vehicleCards).forEach(([secId, cards]) => {
      const vehName = selectedVehicles[secId]?.name || secId;
      result[secId] = {
        name: vehName,
        variants: {}
      };
      cards.forEach((c) => {
        if (!result[secId].variants[c.variant]) {
          result[secId].variants[c.variant] = [];
        }
        result[secId].variants[c.variant].push({
          id: c.id,
          vehicleNo: c.vehicleNo,
          vehicleName: c.vehicleName
        });
      });
    });

    console.log("🚛 Final JSON:", JSON.stringify(result, null, 2));
  };

  return (
    <ScrollWrapper>
      <View style={styles.container}>
        {/* Dropdown / Modal Trigger */}
        <TouchableOpacity
          style={styles.dropdownBtn}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.dropdownText}>Select Vehicle Types</Text>
        </TouchableOpacity>

        {/* Modal */}
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Choose Vehicles</Text>
              {VEHICLE_OPTIONS.map((v) => (
                <TouchableOpacity
                  key={v.id}
                  style={[
                    styles.option,
                    selectedVehicles[makeSectionId(v.name)] &&
                      styles.optionSelected
                  ]}
                  onPress={() => toggleVehicle(v)}
                >
                  <Text>{v.name}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: "#fff" }}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Horizontal scroll for sections */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Object.values(selectedVehicles).map((veh) => (
            <View key={veh.sectionId} style={styles.vehicleBox}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 12
                }}
              >
                <Text style={styles.vehicleTitle}>
                  {veh.name} ({veh.sectionId})
                </Text>

                <Pressable onPress={() => toggleVehicle(veh)}>
                  {/* onPress={() => console.log("veh", veh)} */}
                  {/* onPress={() => toggleVehicle(v)} */}
                  <MaterialCommunityIcons name="delete" size={24} color="red" />
                </Pressable>
              </View>

              {/* Counters vertically */}
              {VARIANTS.map((variant) => (
                <View key={variant} style={styles.counterRow}>
                  <Text>{variant}</Text>
                  <View style={styles.counterBtns}>
                    <TouchableOpacity
                      style={styles.counterBtn}
                      onPress={() =>
                        changeQuantity(veh.sectionId, veh.name, variant, -1)
                      }
                    >
                      <Text>-</Text>
                    </TouchableOpacity>
                    <Text>{veh.variants[variant]?.count || 0}</Text>
                    <TouchableOpacity
                      style={styles.counterBtn}
                      onPress={() =>
                        changeQuantity(veh.sectionId, veh.name, variant, +1)
                      }
                    >
                      <Text>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}

              {/* Vehicle Cards for this section */}
              <ScrollView style={{ maxHeight: 250 }}>
                {(vehicleCards[veh.sectionId] || []).map((card) => (
                  <View key={card.id} style={styles.card}>
                    <Text style={styles.cardTitle}>
                      {card.variant} ({card.id})
                    </Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Vehicle No"
                      value={card.vehicleNo}
                      onChangeText={(val) =>
                        updateCardField(
                          veh.sectionId,
                          card.id,
                          "vehicleNo",
                          val
                        )
                      }
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Vehicle Name"
                      value={card.vehicleName}
                      onChangeText={(val) =>
                        updateCardField(
                          veh.sectionId,
                          card.id,
                          "vehicleName",
                          val
                        )
                      }
                    />
                  </View>
                ))}
              </ScrollView>
            </View>
          ))}
        </ScrollView>

        {/* Submit */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={{ color: "#fff", fontSize: 16 }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  dropdownBtn: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10
  },
  dropdownText: { color: "#fff", fontSize: 16, textAlign: "center" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  modalBox: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 10
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd"
  },
  optionSelected: { backgroundColor: "#c8e6c9" },
  closeBtn: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
    alignItems: "center"
  },
  vehicleBox: {
    backgroundColor: "#fff",
    // backgroundColor: "red",
    height: 390,
    padding: 12,
    borderRadius: 10,
    marginRight: 12,
    elevation: 2,
    width: 260
  },
  vehicleTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  counterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 6
  },
  counterBtns: { flexDirection: "row", alignItems: "center" },
  counterBtn: {
    backgroundColor: "#ddd",
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 4
  },
  card: {
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderRadius: 8,
    marginVertical: 6
  },
  cardTitle: { fontWeight: "bold", marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    marginBottom: 6
  },
  submitBtn: {
    backgroundColor: "#2196F3",
    padding: 14,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center"
  }
});
