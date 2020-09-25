import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
export function ErrorIndicator({ message, handler }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.textIndicator, styles.bold]}>
        {message || "Something went wrong"}
      </Text>
      <MaterialIcons
        name="refresh"
        style={styles.reloadIcon}
        color="white"
        size={30}
        onPress={handler}
      />
    </View>
  );
}
export function EmptyIndicator({ message }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.textIndicator, styles.bold]}>
        {message || "EMPTY"}
      </Text>
    </View>
  );
}

export default { ErrorIndicator, EmptyIndicator };

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  textIndicator: {
    fontSize: 20,
    marginBottom: 20,
  },
  reloadIcon: { backgroundColor: "black", padding: 10, borderRadius: 25 },
  bold: {
    fontWeight: "bold",
  },
});
