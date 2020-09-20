import React from "react";
import { StyleSheet, View } from "react-native";

export default function CardView({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 6, width: 7 },
    shadowOpacity: 0.5,
    borderRadius: 10,
  },
});
