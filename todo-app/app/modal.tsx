import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { ThemedText } from "../components/ThemedText";
import { ThemedView } from "../components/ThemedView";
import { COLORS } from "../constants/colors";

export default function ModalScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Modal</ThemedText>
      <ThemedView style={styles.separator} />
      <ThemedText>
        This modal demonstrates a simple example. You can customize the
        appearance and behavior in the code.
      </ThemedText>

      <StatusBar barStyle="light-content" />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
    backgroundColor: COLORS.border,
  },
});
