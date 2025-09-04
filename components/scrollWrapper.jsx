// ScrollWrapper.js
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ScrollWrapper({
  children,
  bodyColor = "#ffffff",
  statusBarColor = "#ffffff",
  statusBarStyle = "dark-content",
  handleWrapperStyle = {},
  scrollEnabled = true,
  keyboardVerticalOffset = 0,
  asFlatList = false, // NEW PROP
  flatListProps = {} // if using FlatList
}) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.flex}>
      {/* Safe area top */}
      <View style={{ height: insets.top, backgroundColor: statusBarColor }} />

      <StatusBar
        translucent={false}
        barStyle={statusBarStyle}
        backgroundColor={statusBarColor}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={keyboardVerticalOffset + insets.top}
      >
        {asFlatList ? (
          <FlatList
            {...flatListProps}
            style={[styles.flex, { backgroundColor: bodyColor }]}
            contentContainerStyle={[
              styles.scrollContent,
              handleWrapperStyle,
              flatListProps.contentContainerStyle
            ]}
          />
        ) : (
          <ScrollView
            style={[styles.flex, { backgroundColor: bodyColor }]}
            contentContainerStyle={[styles.scrollContent, handleWrapperStyle]}
            keyboardShouldPersistTaps="handled"
            scrollEnabled={scrollEnabled}
          >
            {children}
            <View style={{ height: insets.bottom }} />
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 20
  }
});
