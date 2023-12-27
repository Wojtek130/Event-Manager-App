import MultiSelect from "react-native-multiple-select";

const MyMultiSelect = (props) => {
  return (
    <MultiSelect
      // hideTags
      items={props.items}
      uniqueKey="id"
      // ref={(component) => {
      //   this.multiSelect = component;
      // }}
      onSelectedItemsChange={props.callback}
      selectedItems={props.value}
      selectText="Pick Organizers"
      searchInputPlaceholderText="Search Users..."
      // onChangeInput={(text) => console.log(text)}
      altFontFamily="ProximaNova-Light"
      tagRemoveIconColor="#CCC"
      tagBorderColor="#CCC"
      tagTextColor="#CCC"
      selectedItemTextColor="#CCC"
      selectedItemIconColor="#CCC"
      itemTextColor="#000"
      displayKey="username"
      searchInputStyle={{ color: "#CCC" }}
      submitButtonColor="#CCC"
      submitButtonText="Choose"
    />
  );
};

export default MyMultiSelect;
