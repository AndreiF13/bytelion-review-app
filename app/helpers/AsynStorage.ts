import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveItem(key: string, value: any) {
  if (key && value) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }
}

export async function removeItem(key: string) {
  if (key) {
    await AsyncStorage.removeItem(key);
  }
}

export async function getItem(key: string) {
  if (key) {
    const data: any = await AsyncStorage.getItem(key);
    return JSON.parse(data);
  }
  return null;
}
