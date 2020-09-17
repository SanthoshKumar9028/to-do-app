import React from "react";
import { Text } from "react-native";

export default function Timer({ dateObject, ...rest }) {
  if (!dateObject instanceof Date)
    throw new Error('Timer components missing "dateObject" props');
  let diffMis = Date.now() - dateObject;
  const oneMinutes = 1000 * 60;
  if (diffMis < oneMinutes) {
    return <Text {...rest}>few sec ago</Text>;
  } else if (diffMis < oneMinutes * 60) {
    return <Text {...rest}>few mins ago</Text>;
  } else if (diffMis < oneMinutes * 60 * 60) {
    return (
      <Text {...rest}>
        {dateObject.getHours() + ":" + dateObject.getMinutes()}
      </Text>
    );
  } else {
    return (
      <Text {...rest}>
        {dateObject.getDate() +
          "/" +
          dateObject.getMonth() +
          "/" +
          dateObject.getFullYear()}
      </Text>
    );
  }
}
