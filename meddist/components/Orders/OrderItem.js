/** @format */
import { StyleSheet, View, Text } from "react-native";

import MedicinesList from "../SearchMedicines/MedicinesList";
import Title from "../UI/Title";

const OrderItem = ({ id, products, totalPrice, orderedAt, containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.cartInfoContainer}>
        <View>
          <Text style={styles.cartInfoText}>Order Summary:</Text>
          <Text style={styles.cartInfoText}>Delivery Price:</Text>
          <Text style={id ? styles.cartInfoText : styles.cartInfoTextTotal}>
            Order Total:
          </Text>
          {id && <Text style={styles.cartInfoTextTotal}>Date:</Text>}
        </View>
        <View>
          <Text style={styles.cartInfoText}>{`$ ${totalPrice.toFixed(
            2
          )}`}</Text>
          <Text style={styles.cartInfoText}>$ 20</Text>
          <Text
            style={id ? styles.cartInfoText : styles.cartInfoTextTotal}
          >{`$ ${totalPrice ? (totalPrice + 20).toFixed(2) : 0}`}</Text>
          {id && (
            <Text style={styles.cartInfoTextTotal}>
              {`${new Date(
                Date.parse(orderedAt)
              ).toLocaleDateString()} ${new Date(
                Date.parse(orderedAt)
              ).toLocaleTimeString()}`}
            </Text>
          )}
        </View>
      </View>
      <Title>Products Added:</Title>
      <MedicinesList medicines={products} orderId={id} />
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 15,
    paddingVertical: 15,
  },
  cartInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  cartInfoText: {
    fontSize: 16,
  },
  cartInfoTextTotal: { fontSize: 20 },
});
