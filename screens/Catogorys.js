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
import { MaterialIcons } from "@expo/vector-icons";

import DataSource from "../dataSource";
import Colors from "../constants/colors";
import CatogoryRow from "../components/CatogoryRow";
import InputModel from "../components/InputModel";
import FabButton from "../components/buttons/FabButton";
import InfoModal from "../components/InfoModal";

export default function Catogorys({ navigation }) {
  let [isLoading, setIsLoading] = useState(true);
  let [hasError, setHasError] = useState(false);
  let [data, setData] = useState([]);
  let [isInputModelVisible, setIsInputModelVisible] = useState(false);
  let [isInfoModelVisible, setIsInfoModelVisible] = useState(false);
  let [currentInfo, setCurrentInfo] = useState({});
  let [isRefreshing, setIsRefreshing] = useState(false);

  async function retriveData() {
    setIsLoading(true);
    try {
      let catogorys = await DataSource.get("catogorys");
      setData(JSON.parse(catogorys || "[]"));
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCatogory(id) {
    let toRemoveIndex = data.findIndex((catogory) => catogory.id == id);
    if (toRemoveIndex === -1) return;

    const removeHandler = async () => {
      try {
        setIsLoading(true);
        await DataSource.delete(data[toRemoveIndex].name);
        await DataSource.add(
          "catogorys",
          JSON.stringify(data.filter((_, i) => i != toRemoveIndex))
        );
        retriveData();
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    Alert.alert(
      "Confirm",
      `Are you sure to remove the ${data[toRemoveIndex].name} catogory`,
      [
        { text: "CANCEL" },
        {
          text: "OK",
          onPress: removeHandler,
        },
      ]
    );
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
        return;
      }
      let newCatogory = {
        id: `catogory_${Date.now()}`,
        name,
        addedDate: new Date().toUTCString(),
      };
      catogorys.push(newCatogory);
      await DataSource.add("catogorys", JSON.stringify(catogorys));
      retriveData();
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
          <CatogoryRow
            item={item}
            onPress={() =>
              navigation.navigate("Tasks", {
                screen: "pending",
                params: { currentCatogory: item.name },
              })
            }
            onDeletePress={() => deleteCatogory(item.id)}
            onInfoPress={() => {
              setIsInfoModelVisible(true);
              setCurrentInfo(item);
            }}
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
        title="ADD NEW CATOGORY"
        visible={isInputModelVisible}
        setVisible={setIsInputModelVisible}
        submitResult={addCatogory}
      />
      <InfoModal
        visible={isInfoModelVisible}
        setVisible={setIsInfoModelVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.infoContent}>
          <View>
            <Text style={[styles.bold, styles.CatoProp]}>Name:</Text>
            <Text style={[styles.bold, styles.CatoProp]}>Type:</Text>
            <Text style={styles.bold}>Added Date:</Text>
          </View>
          <View>
            <Text style={styles.CatoProp}> {currentInfo.name}</Text>
            <Text style={styles.CatoProp}> CATOGORY</Text>
            <Text>{new Date(currentInfo.addedDate).toLocaleDateString()}</Text>
          </View>
        </View>
      </InfoModal>
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
  errorContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  textIndicator: {
    fontSize: 20,
    marginBottom: 20,
  },
  reloadIcon: { backgroundColor: "black", padding: 10, borderRadius: 25 },
  infoContent: {
    flexDirection: "row",
    backgroundColor: "skyblue",
    height: "35%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  bold: {
    fontWeight: "bold",
  },
  CatoProp: {
    marginBottom: 20,
  },
});
