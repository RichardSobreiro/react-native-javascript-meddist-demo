/** @format */

import { Text, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const Title = ({ children, containerStyle, textStyle }) => {
  return (
    <View style={[styles.container, containerStyle ?? ""]}>
      <Text style={[styles.text, textStyle ?? ""]}>{children}</Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    padding: 5,
    color: GlobalStyles.colors.primary700,
  },
});
