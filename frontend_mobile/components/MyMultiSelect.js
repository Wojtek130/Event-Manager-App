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
      // hideTags
      items={props.items}
      // uniqueKey="id"
      uniqueKey="username"
      // ref={(component) => {
      //   this.multiSelect = component;
      // }}
      onSelectedItemsChange={props.callback}
      selectedItems={props.value}
      selectText={props.text}
      searchInputPlaceholderText="Search Users..."
      // onChangeInput={(text) => console.log(text)}
      altFontFamily="ProximaNova-Light"
      // tagRemoveIconColor="rgb(33, 126, 222)"
      // tagBorderColor="rgb(33, 126, 222)"
      // tagTextColor="rgb(33, 126, 222)"
      // itemTextColor="rgba(33, 126, 222, 0.5)"
      tagRemoveIconColor="white"
      tagBorderColor="white"
      tagTextColor="white"
      // selectedItemTextColor="white"
      // selectedItemIconColor="white"
      selectedItemTextColor="rgb(33, 126, 222)"
      selectedItemIconColor="rgb(33, 126, 222)"
      itemTextColor="rgba(33, 126, 222, 0.5)"
      displayKey="username"
      searchInputStyle={{ color: "rgb(33, 126, 222)" }}
      styleIndicator = {{color : "white"}}
      submitButtonColor={globalStyles.bluePrimary}
      submitButtonText="Choose"
      styleMainWrapper={[styles.multiSelectMainWrapper]}
      styleDropdownMenuSubsection={{ backgroundColor: "rgb(33, 126, 222)", color:"pink" }}
      styleTextTag={{ backgroundColor: "yellow" }}
      textColor="white"

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
