import React from "react";

import DefaultInput from "../UI/DefaultInput/DefaultInput";

const placeInput = props => {
  return (
    <DefaultInput
      placeholder="Place name"
      value={props.placeData.value}
      onChangeText={props.onChangeText}
      valid={props.placeData.valid}
      touched={props.placeData.touched}
    />
  );
};

export default placeInput;
