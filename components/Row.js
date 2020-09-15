import React from "react";
import { StyleSheet, Text } from "react-native";

import CardView from "../components/custom-view/CardView";

export default function Row({ title }) {
  return (
    <>
      <CardView style={styles.card}>
        <Text style={styles.cardText}>{title}</Text>
      </CardView>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginVertical: 5,
  },
  cardText: {
    left: 5,
    fontSize: 18,
  },
});
