/** @format */

import { FlatList, View } from "react-native";
import MedicineItem from "./MedicineItem";

const MedicinesList = ({ medicines, orderId }) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        showsVerticalScrollIndicator={true}
        data={medicines}
        renderItem={(itemData) => {
          return <MedicineItem {...itemData.item} orderId={orderId} />;
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default MedicinesList;
