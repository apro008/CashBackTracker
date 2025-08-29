import { MMKV } from 'react-native-mmkv';

export const mmkv = new MMKV({ id: 'app-storage' });

export const mmkvAsync = {
  setItem: (key: string, value: string) => {
    mmkv.set(key, value);
    return Promise.resolve();
  },
  getItem: (key: string) => {
    const v = mmkv.getString(key);
    return Promise.resolve(v ?? null);
  },
  removeItem: (key: string) => {
    mmkv.delete(key);
    return Promise.resolve();
  },
};
