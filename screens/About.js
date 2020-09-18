import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.row}>
          <Text>APP NAME:</Text>
          <Text>TO DO APP:</Text>
        </View>
        <View style={styles.row}>
          <Text>APP VERSION:</Text>
          <Text>1.0</Text>
        </View>
        <View style={styles.row}>
          <Text>DESIGN & DEVELOPED BY:</Text>
          <Text>SANTHOSH KUMAR</Text>
        </View>
      </View>
      <Text style={styles.copyRight}>Copy @ 2019 - 2020</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
  copyRight: { marginVertical: 10, textAlign: "center", fontWeight: "bold" },
});
