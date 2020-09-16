import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import Catogorys from "../screens/Catogorys";
import CatogorysHelp from "../screens/CatogorysHelp";
import AllTasks from "../screens/AllTasks";
import PendingTasks from "../screens/PendingTasks";
import FinishedTasks from "../screens/FinishedTasks";
import Colors from "../constants/colors";

const Tab = createMaterialTopTabNavigator();

const Tabs = () => (
  <Tab.Navigator
    tabBarOptions={{
      tabStyle: { backgroundColor: Colors.secondaryColor },
      activeTintColor: "white",
      indicatorStyle: { backgroundColor: "black", top: "100%" },
    }}
  >
    <Tab.Screen name="all" component={AllTasks} />
    <Tab.Screen name="pending" component={PendingTasks} />
    <Tab.Screen name="finished" component={FinishedTasks} />
  </Tab.Navigator>
);

const HomeStack = createStackNavigator();
export default () => (
  <NavigationContainer>
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primaryColor },
      }}
    >
      <HomeStack.Screen
        name="Catogorys"
        component={Catogorys}
        options={({ navigation }) => ({
          headerRight: () => (
            <MaterialIcons
              name="help"
              color="black"
              size={25}
              style={{ marginRight: 10 }}
              onPress={() => navigation.navigate("CatogoryHelp")}
            />
          ),
        })}
      />
      <HomeStack.Screen name="Tasks" component={Tabs} />
      <HomeStack.Screen
        name="CatogoryHelp"
        component={CatogorysHelp}
        options={{ title: "Help" }}
      />
    </HomeStack.Navigator>
  </NavigationContainer>
);
