/** @format */
import { FlatList, StyleSheet } from "react-native";
import OrderItem from "./OrderItem";

const renderOrderItems = (itemData) => {
  return <OrderItem {...itemData.item} />;
};

const OrdersList = ({ orders }) => {
  return (
    <FlatList
      data={orders}
      renderItem={renderOrderItems}
      keyExtractor={(item) => item.id}
      //contentContainerStyle={{ flex: 1 }}
      //style={{ flex: 1 }}
    />
  );
};

export default OrdersList;

const styles = StyleSheet.create({});
