import { StyleSheet, FlatList } from "react-native";

import { globalStyles, width50Per } from "../utils/stylesConstants";

const MyFlatList = (props) => {
  return (
    <FlatList
      data={props.data}
      keyExtractor={(item) => item.name}
      renderItem={props.renderItem}
      style={[globalStyles.mainChildren, styles.flatList]}
      windowSize={Number.MAX_SAFE_INTEGER}
    />
  );
};

const styles = StyleSheet.create({
  flatList: { width: width50Per },
});
export default MyFlatList;
