/** @format */

import { ActivityIndicator, StyleSheet, View } from "react-native";

import { GlobalStyles } from "../../constants/styles";

const Loader = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size={100} color={GlobalStyles.colors.primary700} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
