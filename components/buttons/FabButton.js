import React from "react";
import { StyleSheet, View } from "react-native";

export default function ({ children, style }) {
  return <View style={[styles.fab, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  fab: {
    padding: 10,
    bottom: 25,
    right: 25,
    position: "absolute",
    backgroundColor: "blue",
    borderRadius: 25,
  },
});
