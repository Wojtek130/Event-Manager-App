import MultiSelect from "react-native-multiple-select";
import { StyleSheet } from "react-native";

import {
  globalStyles,
  margin,
  padding,
  borderRadius,
  bluePrimary,
} from "../utils/stylesConstants";

const MyMultiSelect = (props) => {
  return (
    <MultiSelect
      items={props.items}
      uniqueKey="username"
      onSelectedItemsChange={props.callback}
      selectedItems={props.value}
      selectText={props.text}
      searchInputPlaceholderText="Search Users..."
      altFontFamily="ProximaNova-Light"
      tagRemoveIconColor="white"
      tagBorderColor="white"
      tagTextColor="white"
      selectedItemTextColor="rgb(33, 126, 222)"
      selectedItemIconColor="rgb(33, 126, 222)"
      itemTextColor="rgba(33, 126, 222, 0.5)"
      displayKey="username"
      searchInputStyle={{ color: "rgb(33, 126, 222)" }}
      submitButtonColor={globalStyles.bluePrimary}
      submitButtonText="Choose"
      styleMainWrapper={[styles.multiSelectMainWrapper]}
      styleDropdownMenuSubsection={{
        backgroundColor: "rgb(33, 126, 222)",
      }}
      textColor="white"
      fontFamily="sans-serif"
      altFontFamilyfontFamily="sans-serif"

    />
  );
};
const styles = StyleSheet.create({
  multiSelectMainWrapper: {
    backgroundColor: bluePrimary,
    margin: margin,
    padding: padding,
    paddingBottom: 6,
    borderRadius: borderRadius,
  },
});

export default MyMultiSelect;
