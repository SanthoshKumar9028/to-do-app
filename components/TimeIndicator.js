import React from "react";
import { Text } from "react-native";

export default function Timer({ dateObject }) {
  if (!dateObject instanceof Date)
    throw new Error('Timer components missing "dateObject" props');
  let diffMis = Date.now() - dateObject;
  const oneMinutes = 1000 * 60;
  if (diffMis < oneMinutes) {
    return <Text>few sec ago</Text>;
  } else if (diffMis < oneMinutes * 60) {
    return <Text>few mins ago</Text>;
  } else if (diffMis < oneMinutes * 60 * 60) {
    return <Text>{dateObject.getHours() + ":" + dateObject.getMinutes()}</Text>;
  } else {
    return (
      <Text>
        {dateObject.getDate() +
          "/" +
          dateObject.getMonth() +
          "/" +
          dateObject.getFullYear()}
      </Text>
    );
  }
}
