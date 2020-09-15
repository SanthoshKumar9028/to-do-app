import React, { useState } from "react";
import {
  StyleSheet,
  Modal,
  View,
  Text,
  Button,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

export default function ({
  title,
  visible,
  setVisible,
  submitResult,
  inputProps,
}) {
  let [value, setValue] = useState("");
  async function submitValue() {
    setValue("");
    setVisible(false);
    submitResult(value);
  }
  return (
    <Modal visible={visible} animationType="slide">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={value}
              onChangeText={setValue}
              placeholder="type.."
              style={styles.input}
              {...inputProps}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Submit" disabled={!value} onPress={submitValue} />

            <Button
              title="cancel"
              color="red"
              onPress={() => setVisible(false)}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "space-evenly",
    marginHorizontal: 25,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  input: {
    width: "80%",
    borderBottomColor: "black",
    borderBottomWidth: 2,
    color: "black",
  },
  inputContainer: {
    alignItems: "center",
  },
  buttonContainer: {
    alignItems: "stretch",
    flexBasis: 100,
    justifyContent: "space-evenly",
  },
});
