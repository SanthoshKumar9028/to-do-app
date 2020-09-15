import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import DataSource from "../dataSource";

export default function AllTasks({ navigation, route }) {
  let [isLoading, setIsLoading] = useState(true);
  let [hasError, setHasError] = useState(false);
  let [data, setData] = useState([]);

  async function retriveData() {
    setIsLoading(true);
    try {
      let { currentCatogory } = route.params;
      AsyncStorage.setItem("current-catogory", currentCatogory);
      let tasks = await DataSource.get(currentCatogory);
      setData(JSON.parse(tasks || "[]"));
    } catch (error) {
      console.log(error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    return navigation.addListener("focus", retriveData);
  }, [navigation]);
  let content;
  if (isLoading) {
    content = <Text>isLoading</Text>;
  } else if (hasError) {
    content = <Text>has error</Text>;
  } else if (data.length < 1) {
    content = <Text>empty</Text>;
  } else {
    content = <Text>{data.length}</Text>;
  }

  return (
    <View style={styles.container}>
      {content}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
});
