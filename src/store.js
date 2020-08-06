import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-community/async-storage';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import Reducers from './Reducer';

const persistConfig = {
 key: 'root',
 storage: AsyncStorage,
 stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const pReducer = persistReducer(persistConfig, Reducers);

export const store = createStore(pReducer);
export const persistor = persistStore(store);