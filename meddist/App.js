/** @format */

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text } from "react-native";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

import { GlobalStyles } from "./constants/styles";
import SearchMedicines from "./screens/SearchMedicines";
import AllOrders from "./screens/AllOrders";
import ShoppingCartIcon from "./components/UI/ShoppingCartIcon";
import ShoppingCart from "./screens/ShoppingCart";

const getHeaderTitle = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Search Medicines";
  switch (routeName) {
    case "SearchMedicines":
      return "Search Medicines";
    case "ShoppingCart":
      return "Shopping Cart";
  }
};

const BottomTabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const SearchMedicinesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="SearchMedicines"
        component={SearchMedicines}
        options={{
          title: "Search Medicines",
        }}
      />
      <Stack.Screen
        name="ShoppingCart"
        component={ShoppingCart}
        options={{
          title: "Shopping Cart",
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
          <StatusBar style="auto" />
          <NavigationContainer>
            <BottomTabs.Navigator
              screenOptions={({ navigation }) => ({
                headerStyle: {
                  backgroundColor: GlobalStyles.colors.primary500,
                },
                headerTintColor: "white",
                tabBarStyle: {
                  backgroundColor: GlobalStyles.colors.primary500,
                },
                tabBarActiveTintColor: GlobalStyles.colors.accent500,
                headerRight: ({ tintColor }) => (
                  <ShoppingCartIcon
                    navigation={navigation}
                    tintColor={tintColor}
                    onPress={() => {
                      navigation.navigate("ShoppingCart");
                    }}
                  ></ShoppingCartIcon>
                ),
              })}
            >
              <BottomTabs.Screen
                name="SearchMedicinesStack"
                component={SearchMedicinesStack}
                options={({ route }) => ({
                  title: "Search Medicines",
                  headerTitle: getHeaderTitle(route),
                  tabBarLabel: "Medicines",
                  tabBarIcon: ({ color, size }) => (
                    <AntDesign name="medicinebox" size={size} color={color} />
                  ),
                })}
              />
              <BottomTabs.Screen
                name="AllOrders"
                component={AllOrders}
                options={{
                  title: "All Orders",
                  tabBarLabel: "All Orders",
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="calendar" size={size} color={color} />
                  ),
                }}
              />
            </BottomTabs.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
