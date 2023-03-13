/** @format */

import {
  Text,
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import { useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  setQuantity,
} from "../../store/cartSlice";

import AntIconButton from "../UI/AntIconButton";
import { GlobalStyles } from "../../constants/styles";
import Input from "../UI/Input";

const MedicineItem = ({ id, name, price, orderId }) => {
  const { width, height } = useWindowDimensions();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const item = cart.find((item) => item.id === id);
  const [input, setInput] = useState({
    amount: {
      value: item ? item.quantity + "" : "",
      isValid: true,
    },
  });

  useLayoutEffect(() => {
    let value = item ? item.quantity : 0;
    setInput({
      amount: {
        value: value + "",
        isValid: !isNaN(value) && value > 0,
      },
    });
  }, [item]);

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
  };

  const incrementFromCartHandler = (id) => {
    dispatch(incrementQuantity(id));
  };

  const decrementFromCartHandler = (id) => {
    dispatch(decrementQuantity(id));
  };

  const productWasAddedHandler = (id) => {
    const item = cart.find((item) => item.id === id);
    if (item) {
      return true;
    } else {
      return false;
    }
  };
  let isInShoppingCart = productWasAddedHandler(id);

  let imageSize = width / 2 - 27;
  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };

  const inputChangedHandler = (inputIdentifier, enteredValue) => {
    setInput((curInput) => {
      return {
        ...curInput,
        [inputIdentifier]: {
          value: enteredValue,
          isValid: !isNaN(enteredValue) && enteredValue > 0,
        },
      };
    });
    dispatch(setQuantity({ id: id, quantity: enteredValue }));
  };

  return (
    <View style={styles.itemContainer}>
      <View style={[styles.imageContainer, imageStyle]}>
        <Image
          style={styles.image}
          source={require("../../assets/images/p-2.jpg")}
        />
      </View>
      <View style={styles.productInfoContainer}>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.price}>$ {price}</Text>
        </View>
        {!orderId && (
          <View style={styles.addMinActionsContainer}>
            {isInShoppingCart && (
              <AntIconButton
                icon="minussquareo"
                size={50}
                color={GlobalStyles.colors.primary700}
                onPress={decrementFromCartHandler.bind(this, id)}
              />
            )}
            <AntIconButton
              icon="plussquare"
              size={50}
              color={GlobalStyles.colors.primary700}
              onPress={
                isInShoppingCart
                  ? incrementFromCartHandler.bind(this, id)
                  : addToCartHandler.bind(this, {
                      id: id,
                      name: name,
                      price: price,
                    })
              }
            />
          </View>
        )}
        {isInShoppingCart && !orderId && (
          <Input
            style={styles.rowInput}
            label="Amount"
            invalid={!input.amount.isValid}
            textInputConfig={{
              keyboardType: "numeric",
              onChangeText: inputChangedHandler.bind(this, "amount"),
              value: input.amount.value,
            }}
          ></Input>
        )}
      </View>
    </View>
  );
};

export default MedicineItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    padding: 12,
    marginHorizontal: 15,
    marginVertical: 7,
    borderRadius: 3,
    elevation: 2,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  imageContainer: {},
  image: {
    width: "100%",
    height: "100%",
  },
  productInfoContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  name: {
    color: GlobalStyles.colors.black,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  price: {
    color: GlobalStyles.colors.black,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  addMinActionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 12,
  },
  inputsRow: {},
});
