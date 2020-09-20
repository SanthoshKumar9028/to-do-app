import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-community/async-storage";
import DataSource from "../dataSource";
import Colors from "../constants/colors";
import CardView from "../components/custom-view/CardView";

export default function FinishedTasks({ navigation }) {
  let [isLoading, setIsLoading] = useState(true);
  let [hasError, setHasError] = useState(false);
  let [data, setData] = useState([]);
  let [isRefreshing, setIsRefreshing] = useState(false);

  async function retriveData() {
    setIsLoading(true);
    try {
      let currentCatogory = await AsyncStorage.getItem("current-catogory");
      let tasks = await DataSource.get(currentCatogory);
      tasks = JSON.parse(tasks || "[]");
      setData(tasks.filter((task) => task.finished));
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
  if (isLoading)
    content = (
      <ActivityIndicator
        style={{ flex: 1 }}
        size="large"
        color={Colors.primaryColor}
      />
    );
  else if (hasError)
    content = (
      <View style={styles.errorContainer}>
        <Text style={[styles.textIndicator, styles.bold]}>
          Something went wrong
        </Text>
        <MaterialIcons
          name="refresh"
          style={styles.reloadIcon}
          color="white"
          size={30}
          onPress={retriveData}
        />
      </View>
    );
  else if (data && data.length < 1)
    content = (
      <View style={styles.errorContainer}>
        <Text style={[styles.textIndicator, styles.bold]}>Empty</Text>
      </View>
    );
  else if (data instanceof Array)
    content = (
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardView style={styles.card}>
            <Text style={styles.cardText}>{item.needToDo}</Text>
          </CardView>
        )}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => {
              retriveData().then(() => setIsRefreshing(false));
            }}
          />
        }
      />
    );

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
    alignItems: "stretch",
  },
  card: {
    margin: 10,
    padding: 10,
  },
  cardText: {
    fontSize: 16,
  },
  errorContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  textIndicator: {
    fontSize: 20,
    marginBottom: 20,
  },
  reloadIcon: { backgroundColor: "black", padding: 10, borderRadius: 25 },
  bold: {
    fontWeight: "bold",
  },
});
