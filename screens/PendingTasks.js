import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-community/async-storage";
import DataSource from "../dataSource";
import Colors from "../constants/colors";
import CardView from "../components/custom-view/CardView";
import InputModel from "../components/InputModel";
import FabButton from "../components/buttons/FabButton";
import TimeIndicator from "../components/TimeIndicator";

export default function AllTasks({ navigation, route }) {
  let [isLoading, setIsLoading] = useState(true);
  let [hasError, setHasError] = useState(false);
  let [data, setData] = useState([]);
  let [isInputModelVisible, setIsInputModelVisible] = useState(false);
  let [isRefreshing, setIsRefreshing] = useState(false);

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

  async function markAsFinished(id) {
    setIsLoading(true);
    try {
      let { currentCatogory } = route.params;
      let newTasks = data.map((task) =>
        task.id == id ? { ...task, finished: true } : task
      );
      await DataSource.add(currentCatogory, JSON.stringify(newTasks));
      setData(newTasks);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }

  async function addTask(newTask) {
    setIsLoading(true);
    try {
      let { currentCatogory } = route.params;
      let newTasks = [
        ...data,
        {
          id: `task_${Date.now()}`,
          needToDo: newTask,
          addedDate: new Date().toUTCString(),
          finished: false,
        },
      ];
      await DataSource.add(currentCatogory, JSON.stringify(newTasks));
      setData(newTasks);
    } catch (error) {
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
  else if (data.length < 1 || data.every((task) => task.finished))
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
        renderItem={({ item }) =>
          item.finished ? null : (
            <CardView style={styles.card}>
              <Text style={styles.cardText}>{item.needToDo}</Text>
              <TimeIndicator
                style={styles.timer}
                dateObject={new Date(item.addedDate)}
              />
              <TouchableOpacity
                style={styles.markFinishedIconContainer}
                activeOpacity={0.5}
                onPress={() => markAsFinished(item.id)}
              >
                <MaterialIcons
                  name="check"
                  size={20}
                  color="black"
                  style={styles.markFinishedIcon}
                />
              </TouchableOpacity>
            </CardView>
          )
        }
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
      <InputModel
        title="ADD NEW TASK"
        visible={isInputModelVisible}
        setVisible={setIsInputModelVisible}
        submitResult={addTask}
      />
      <FabButton>
        <MaterialIcons
          color="white"
          name="add"
          size={30}
          onPress={() => setIsInputModelVisible(true)}
        />
      </FabButton>
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
    paddingBottom: 10,
  },
  timer: { alignSelf: "flex-end", paddingRight: 10 },
  errorContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  textIndicator: {
    fontSize: 20,
    marginBottom: 20,
  },
  reloadIcon: { backgroundColor: "black", padding: 10, borderRadius: 25 },
  markFinishedIconContainer: {
    marginTop: 10,
    paddingVertical: 5,
    backgroundColor: "lightgreen",
    borderRadius: 15,
  },
  markFinishedIcon: { textAlign: "center", color: "green" },
  bold: {
    fontWeight: "bold",
  },
});
