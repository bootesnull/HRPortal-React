import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'


import rolesReducer from "./reducers/rolesReducer";
import userReducer from "./reducers/userReducer";
import permissionReducer from "./reducers/permissionReducer";

const reducers = combineReducers({
    Roles: rolesReducer,
    Users: userReducer,
    Permissions: permissionReducer,

});

const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ["Roles"]
};

const persistedReducer = persistReducer(persistConfig, reducers);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
    //   thunk: {
    //     extraArgument: ,
    //   },
      serializableCheck: false,
    }),
})

export const persistStorage = persistStore(store)

