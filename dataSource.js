import AsyncStorage from "@react-native-community/async-storage";

export default {
  get(key) {
    return AsyncStorage.getItem(key);
  },
  add(key, value) {
    return AsyncStorage.setItem(key, value);
  },
  delete(key) {
    return AsyncStorage.removeItem(key);
  },
};
