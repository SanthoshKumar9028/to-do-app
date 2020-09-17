import AsyncStorage from "@react-native-community/async-storage";

// AsyncStorage.setItem(
//   "catogorys",
//   JSON.stringify([
//     { id: "item0", name: "one catogorys", addedDate: new Date().toUTCString() },
//     { id: "item1", name: "two catogorys", addedDate: new Date().toUTCString() },
//     {
//       id: "item2",
//       name: "three catogorys",
//       addedDate: new Date().toUTCString(),
//     },
//   ])
// );
// AsyncStorage.setItem(
//   "one catogorys",
//   JSON.stringify([
//     {
//       id: "task0",
//       needToDo: "Nothing to do 1",
//       finished: false,
//       addedDate: new Date().toUTCString(),
//     },
//     {
//       id: "task1",
//       needToDo: "Nothing to do",
//       finished: false,
//       addedDate: new Date().toUTCString(),
//     },
//     {
//       id: "task2",
//       needToDo: "Nothing to do",
//       finished: false,
//       addedDate: new Date().toUTCString(),
//     },
//     {
//       id: "task3",
//       needToDo: "Nothing to do",
//       finished: false,
//       addedDate: new Date().toUTCString(),
//     },
//   ])
// );
// AsyncStorage.setItem(
//   "two catogorys",
//   JSON.stringify([
//     {
//       id: "task0",
//       needToDo: "Nothing to do 2",
//       finished: false,
//       addedDate: new Date().toUTCString(),
//     },
//     {
//       id: "task1",
//       needToDo: "Nothing to do",
//       finished: false,
//       addedDate: new Date().toUTCString(),
//     },
//     {
//       id: "task2",
//       needToDo: "Nothing to do",
//       finished: false,
//       addedDate: new Date().toUTCString(),
//     },
//     {
//       id: "task3",
//       needToDo: "Nothing to do",
//       finished: false,
//       addedDate: new Date().toUTCString(),
//     },
//   ])
// );
// AsyncStorage.setItem(
//   "three catogorys",
//   JSON.stringify([
//     {
//       id: "task0",
//       needToDo: "Nothing to do",
//       finished: false,
//       addedDate: new Date().toUTCString(),
//     },
//     {
//       id: "task1",
//       needToDo: "Nothing to do",
//       finished: false,
//       addedDate: new Date().toUTCString(),
//     },
//     {
//       id: "task2",
//       needToDo: "Nothing to do",
//       finished: false,
//       addedDate: new Date().toUTCString(),
//     },
//     {
//       id: "task3",
//       needToDo: "Nothing to do",
//       finished: false,
//       addedDate: new Date().toUTCString(),
//     },
//   ])
// );

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
