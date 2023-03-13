/** @format */

import { StyleSheet, View, Text } from "react-native";
import { useSelector } from "react-redux";

import Button from "../components/UI/Button";
import OrderItem from "../components/Orders/OrderItem";

const ShoppingCart = ({ navigation }) => {
  const shoppingCartState = useSelector((state) => state);

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button
          style={styles.button}
          mode="flat"
          onPress={() => {
            navigation.goBack();
          }}
        >
          Back
        </Button>
        <Button
          style={styles.button}
          onPress={() => {
            navigation.navigate("AllOrders");
          }}
        >
          Create Payment
        </Button>
      </View>
      <OrderItem
        products={shoppingCartState.cart}
        totalPrice={shoppingCartState.totalPrice}
        containerStyle={styles.productsContainerStyle}
      />
    </View>
  );
};

export default ShoppingCart;

const styles = StyleSheet.create({
  productsContainerStyle: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
