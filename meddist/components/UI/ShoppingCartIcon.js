/** @format */

import { StyleSheet, View, Text, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const ShoppingCartIcon = ({ tintColor, onPress }) => {
  const state = useSelector((state) => state);
  return (
    <View style={styles.shoppingCartContainer}>
      <View style={styles.itensCounterContainer}>
        <Text style={[styles.itensCounterText, { color: tintColor }]}>
          ({state.totalItemsQuantity})
        </Text>
      </View>
      <View>
        <Pressable
          onPress={onPress}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <View style={styles.buttonContainer}>
            <AntDesign name="shoppingcart" size={40} color={tintColor} />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default ShoppingCartIcon;

const styles = StyleSheet.create({
  shoppingCartContainer: {
    flexDirection: "row",
  },
  itensCounterContainer: {
    paddingVertical: 10,
  },
  itensCounterText: {
    fontSize: 25,
  },
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginLeft: 0,
    marginRight: 20,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.75,
  },
});
