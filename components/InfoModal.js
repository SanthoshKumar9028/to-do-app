import React from "react";
import {
  StyleSheet,
  Modal,
  View,
  TouchableWithoutFeedback,
} from "react-native";

export default function InfoView(props) {
  let { children, setVisible, ...rest } = props;
  return (
    <Modal {...rest}>
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <View style={styles.container}>{children}</View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-end",
  },
});
