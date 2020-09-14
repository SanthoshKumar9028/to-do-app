import AsyncStorage from "@react-native-community/async-storage";

// AsyncStorage.removeItem("catogorys");

export default {
  get(key) {
    return AsyncStorage.getItem(key);
  },
  add(key, value) {
    return AsyncStorage.setItem(key, value);
  },
  async append(key, value) {
    let data = await AsyncStorage.getItem(key);
    if (value === null)
      return AsyncStorage.setItem(key, JSON.stringify([value]));
    data = JSON.parse(data);
    if (data instanceof Array) data.push(value);
    else throw new Error(`Key(${key}) value should be an array`);
    return AsyncStorage.setItem(key, JSON.stringify(data));
  },
  delete(key) {
    return AsyncStorage.removeItem(key);
  },
};
