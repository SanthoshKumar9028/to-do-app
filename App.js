import React from "react";
import { StyleSheet } from "react-native";
import RootRouter from "./navigation/rootRoute";

export default function App() {
  return <RootRouter />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
