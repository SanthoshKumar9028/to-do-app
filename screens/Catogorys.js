import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Alert,
  RefreshControl,
} from "react-native";

import DataSource from "../dataSource";
import Colors from "../constants/colors";
import CatogoryRow from "../components/CatogoryRow";
import { MaterialIcons } from "@expo/vector-icons";
import InputModel from "../components/InputModel";
import FabButton from "../components/buttons/FabButton";

export default function Catogorys({ navigation }) {
  let [isLoading, setIsLoading] = useState(true);
  let [hasError, setHasError] = useState(false);
  let [data, setData] = useState([]);
  let [isModelVisible, setIsModelVisible] = useState(false);
  let [isRefreshing, setIsRefreshing] = useState(false);

  async function retriveData() {
    setIsLoading(true);
    try {
      let catogorys = await DataSource.get("catogorys");
      setData(JSON.parse(catogorys || "[]"));
    } catch (error) {
      console.log(error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCatogory(id) {
    try {
      setIsLoading(true);
      let catogorys = await DataSource.get("catogorys");
      catogorys = JSON.parse(catogorys || "[]");
      let toRemoveIndex = catogorys.findIndex((catogory) => catogory.id == id);
      if (toRemoveIndex != -1) {
        await DataSource.delete(catogorys[toRemoveIndex].name);
        await DataSource.add(
          "catogorys",
          JSON.stringify(catogorys.filter((_, i) => i != toRemoveIndex))
        );
        retriveData();
      }
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }

  async function addCatogory(name) {
    setIsLoading(true);
    try {
      let catogorys = await DataSource.get("catogorys");
      catogorys = JSON.parse(catogorys || "[]");
      let isExists = catogorys.find((catogory) => catogory.name == name);
      if (isExists) {
        setTimeout(() => {
          Alert.alert("Alredy Exists!", "Please provide another name...", [
            { text: "OK" },
          ]);
        });
      } else {
        let newCatogory = {
          id: `catogory_${Date.now()}`,
          name,
          addedDate: new Date().toUTCString(),
        };
        console.log(newCatogory);
        catogorys.push(newCatogory);
        await DataSource.add("catogorys", JSON.stringify(catogorys));
        retriveData();
      }
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
    content = <Text style={styles.textIndicator}>Something went wrong</Text>;
  else if (data && data.length < 1)
    content = <Text style={styles.textIndicator}>EMPTY</Text>;
  else if (data instanceof Array)
    content = (
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CatogoryRow
            item={item}
            onPress={() =>
              navigation.navigate("Tasks", {
                screen: "all",
                params: { currentCatogory: item.name },
              })
            }
            onDeletePress={() => deleteCatogory(item.id)}
            onInfoPress={() => console.log(item.name)}
          />
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
      <InputModel
        title="ADD CATOGORY"
        visible={isModelVisible}
        setVisible={setIsModelVisible}
        submitResult={addCatogory}
      />
      <FabButton>
        <MaterialIcons
          color="white"
          name="add"
          size={30}
          onPress={() => setIsModelVisible(true)}
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
  textIndicator: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
