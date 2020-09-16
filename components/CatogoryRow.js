import React from "react";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

import CardView from "../components/custom-view/CardView";

export default function CatogoryRow({
  item,
  onDeletePress,
  onInfoPress,
  onPress,
}) {
  return (
    <CardView style={styles.card}>
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <Text style={styles.cardText}>{item.name}</Text>
      </TouchableOpacity>

      <View style={styles.cardButtons}>
        <MaterialIcons name="info" size={22} onPress={onInfoPress} />
        <MaterialIcons
          style={styles.deleteButton}
          name="delete"
          size={22}
          onPress={onDeletePress}
        />
      </View>
    </CardView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 10,
  },
  cardText: {
    left: 5,
    fontSize: 18,
    marginBottom: 10,
  },
  cardButtons: {
    flexDirection: "row-reverse",
    padding: 5,
    paddingBottom: 0,
  },
  deleteButton: {
    marginRight: 15,
  },
});
