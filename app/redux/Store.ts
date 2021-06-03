import AsyncStorage from '@react-native-async-storage/async-storage';
// Redux & Redux Persist stuff
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from './RootReducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
