import React from "react";
import { View, StyleSheet, TextInput, Button } from "react-native";

class PlaceInput extends React.Component {
  state = {
    placeName: ""
  };

  placeNameChangedHandler = val => {
    this.setState({ placeName: val });
  };

  placeSubmitHandler = () => {
    if (this.state.placeName.trim() === "") return;

    this.props.onChangeText(this.state.placeName);
    //this.setState({ placeName: "" });
  };

  render() {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          value={this.state.placeName}
          onChangeText={this.placeNameChangedHandler}
          placeholder="An awesome place"
          style={styles.placeInput}
        />
        <Button
          title="Add"
          style={styles.placeButton}
          onPress={this.placeSubmitHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  placeInput: {
    width: "70%"
  },
  placeButton: {
    width: "30%"
  }
});

export default PlaceInput;
