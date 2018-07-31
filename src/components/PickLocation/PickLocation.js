import React, { Component } from "react";
import { View, Button, StyleSheet, Text } from "react-native";

class PickLocation extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeHolder}>
          <Text>Map</Text>
        </View>
        <View style={styles.button}>
          <Button title="Locate me" onPress={() => alert("hello")}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
  placeHolder: {
    backgroundColor: "#eee",
    borderColor: "black",
    borderWidth: 1,
    width: "80%",
    height: 150
  },
  button: {
    margin: 8
  }
});
export default PickLocation;
