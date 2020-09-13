import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Catogorys from "../screens/Catogorys";
import Tasks from "../screens/Tasks";
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
    <Tab.Screen name="all" component={Tasks} />
    <Tab.Screen name="pending" component={Tasks} />
    <Tab.Screen name="finished" component={Tasks} />
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
      <HomeStack.Screen name="Catogorys" component={Catogorys} />
      <HomeStack.Screen name="Tasks" component={Tabs} />
    </HomeStack.Navigator>
  </NavigationContainer>
);
