import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware
} from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from "./reducers/reducer";
import { thunk } from "redux-thunk";

const persistConfig = {
  key: "root",
  storage
};

const rootReducer = combineReducers({ app: reducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };
