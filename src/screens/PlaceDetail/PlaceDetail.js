import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import { deletePlace } from "../../store/actions/index";

import Icon from "react-native-vector-icons/Ionicons";

class PlaceDetail extends Component {
  state = {
    viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape"
  };
  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();
  };
  constructor(props) {
    super(props);

    Dimensions.addEventListener("change", this.updateStyles);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
  }
  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? "portrait" : "landscape"
    });
  };
  render() {
    return (
      <View
        style={[
          styles.container,
          this.state.viewMode === "portrait"
            ? styles.portraitContentWrapper
            : styles.landscapeContentWrapper
        ]}
      >
        <Image
          source={this.props.selectedPlace.image}
          style={
            this.state.viewMode === "portrait"
              ? styles.portraitPlaceImage
              : styles.landscapePlaceImage
          }
        />
        <View style={styles.placeDetailsWrapper}>
          <Text
            style={
              this.state.viewMode === "portrait"
                ? styles.portraitPlaceName
                : styles.landscapePlaceName
            }
          >
            {this.props.selectedPlace.name}
          </Text>
          <TouchableOpacity onPress={this.placeDeletedHandler}>
            <View
              style={
                this.state.viewMode === "portrait"
                  ? styles.portraitDeleteButton
                  : styles.landscapeDeleteButton
              }
            >
              <Icon
                size={30}
                color="red"
                name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1
  },
  portraitContentWrapper: {
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  landscapeContentWrapper: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  portraitPlaceImage: {
    width: "100%",
    height: 200
  },
  landscapePlaceImage: {
    width: "60%",
    height: 200
  },
  placeDetailsWrapper: {
    flexDirection: "column"
  },
  portraitPlaceName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  },
  landscapePlaceName: {
    fontWeight: "bold",
    textAlign: "right",
    fontSize: 28
  },
  portraitDeleteButton: {
    alignItems: "center"
  },
  landscapeDeleteButton: {
    paddingTop: 20,
    alignItems: "flex-end"
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: key => dispatch(deletePlace(key))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PlaceDetail);
