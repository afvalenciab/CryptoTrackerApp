import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  static instance = new Storage();

  set = async (key: string, value: object | string) => {
    try {
      const valueJSON = JSON.stringify(value);
      await AsyncStorage.setItem(key, valueJSON);

      return true;
    } catch (error) {
      console.log('SetItem storage error', error);
      return false;
    }
  };

  get = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : value;
    } catch (error: any) {
      console.log('GetItem storage error', error);
      throw Error(error);
    }
  };

  multiGet = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const values = await AsyncStorage.multiGet(keys);
      const valuesJSON = values.map(item => [
        item[0],
        item[1] ? JSON.parse(item[1]) : item[1],
      ]);

      return valuesJSON;
    } catch (error: any) {
      console.log('MultiGet storage error', error);
      throw Error(error);
    }
  };

  remove = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.log('Remove Item storage error', error);
      return false;
    }
  };
}

export default Storage;
