import { Button } from "react-native";


const MyButton = (props) => {
  return <Button title={props.title} onPress={props.onPress} />;
};

export default MyButton;
