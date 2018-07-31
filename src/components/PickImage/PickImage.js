import React, { Component } from "react";
import {View, Button, StyleSheet, Image} from "react-native";

import imagePlaceHolder from "../../assets/bergen.jpg";


class PickImage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeHolder}>
          <Image source={imagePlaceHolder} style={styles.previewImage} />
        </View>
        <View style={styles.button}>
          <Button title="Pic image" onPress={() => alert("hello")}/>
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
  },
  previewImage: {
    width: "100%",
    height: "100%"
  }
});

export default PickImage;
