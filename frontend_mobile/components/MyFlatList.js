import { StyleSheet, FlatList } from "react-native";

import { globalStyles, width50Per } from "../utils/stylesConstants";

const MyFlatList = (props) => {
  return (
    <FlatList
      data={props.data}
      keyExtractor={(item) => item.id}
      renderItem={props.renderItem}
      style={[globalStyles.mainChildren, styles.flatList]}
    />
  );
};

const styles = StyleSheet.create({
  flatList: { width: width50Per },
});
export default MyFlatList;
