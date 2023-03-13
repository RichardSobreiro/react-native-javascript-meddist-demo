/** @format */
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import OrdersList from "../components/Orders/OrdersList";
import Loader from "../components/UI/Loader";

import { fetchOrders } from "../util/http/http";

const AllOrders = () => {
  const [ordersList, setOrdersList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function getOrders() {
      setIsFetching(true);
      try {
        const orders = await fetchOrders();
        setOrdersList(orders);
      } catch (error) {
        setError("Could not fetch orders!");
      }
      setIsFetching(false);
    }

    getOrders();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <Loader />;
  }

  return <OrdersList orders={ordersList} />;
};

export default AllOrders;

const styles = StyleSheet.create({});
