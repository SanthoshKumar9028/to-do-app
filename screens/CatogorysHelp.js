import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function App() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.question}>
          <Text style={styles.title}>How to add a new Catogory?</Text>
          <Text style={styles.desc}>
            Tab on the bottom right corner button(
            {<MaterialIcons name="add" color="red" size={18} />}
            ), then a new screen will open. In that screen type the new Catogory
            name and tap {<Text style={styles.bold}>ADD</Text>} button to add or
            {<Text style={styles.bold}> CANCEL</Text>} button to cancel the add
            operation
          </Text>
          <View style={styles.note}>
            <Text>NOTE: every catogory name must be in different</Text>
          </View>
        </View>

        <View style={styles.question}>
          <Text style={styles.title}>How to delete a Catogory?</Text>
          <Text style={styles.desc}>
            For every catogory there will be a delete button(
            {<MaterialIcons name="delete" color="black" size={18} />}) , Tab on
            that and the catogory will removed.
          </Text>
        </View>

        <View style={styles.question}>
          <Text style={styles.title}>How to view details of a Catogory?</Text>
          <Text style={styles.desc}>
            For every catogory there will be a info button(
            {<MaterialIcons name="info" color="black" size={18} />}) , Tab on
            that and the corresponding information will show to you.
          </Text>
        </View>

        <View style={styles.question}>
          <Text style={styles.title}>How to open the tasks?</Text>
          <Text style={styles.desc}>
            Tab on the catogory name to open the corresponding tasks
          </Text>
          <View style={styles.note}>
            <Text>NOTE: First time there will be no tasks</Text>
          </View>
        </View>

        <View style={styles.question}>
          <Text style={styles.title}>How to reload?</Text>
          <Text style={styles.desc}>
            Pull the list of catogories from top to bottom to reload
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    // justifyContent: "center",
  },
  question: {
    marginTop: 10,
    marginBottom: 15,
    marginHorizontal: 15,
  },
  title: {
    fontSize: 20,
    marginVertical: 3,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  desc: { fontSize: 18, marginVertical: 3 },
  bold: {
    fontWeight: "bold",
  },
  note: {
    borderRadius: 5,
    backgroundColor: "yellow",
    padding: 3,
  },
});
