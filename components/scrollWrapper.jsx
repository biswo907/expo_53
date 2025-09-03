import {
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
  bodyColor = "#ffffff", // main screen color
  statusBarColor = "#ffffff", // top bar color
  statusBarStyle = "dark-content", //light-content
  contentContainerStyle = {},
  scrollEnabled = true,
  keyboardVerticalOffset = 0
}) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.flex}>
      {/* Top safe area explicitly colored */}
      <View style={{ height: insets.top, backgroundColor: statusBarColor }} />

      <StatusBar
        translucent={false}
        barStyle={statusBarStyle}
        backgroundColor={statusBarColor} // works on Android only
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={keyboardVerticalOffset + insets.top}
      >
        <ScrollView
          style={[styles.flex, { backgroundColor: bodyColor }]}
          contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={scrollEnabled}
        >
          {children}
          {/* Spacer at bottom */}
          <View style={{ height: insets.bottom }} />
        </ScrollView>
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
