import { applyMiddleware, combineReducers, createStore } from "redux";
import { persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import AuthReducer from "./auth.reducers";

const storage = require("redux-persist/lib/storage").default;
const rootPersistConfig = {
  key: "root",
  whitelist: ["auth"],
  storage,
  stateReconciler: hardSet,
};

const authPersistConfig = {
  key: "auth",
  storage,
  stateReconciler: hardSet,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, AuthReducer),
});

const initState = {
  auth: {
    isLoading: false,
    isAuthenticated: false,
    user: "",
    email: "",
    token: "",
  },
};

const logger = createLogger({ collapsed: true });
const middleware = [thunk, logger];
const enhancer = composeWithDevTools(applyMiddleware(...middleware));

// eslint-disable-next-line import/prefer-default-export
// return createStore(rootReducer, initialState, enhancer);

// eslint-disable-next-line global-require
const { persistStore } = require("redux-persist");
// eslint-disable-next-line global-require
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const storeRedux = createStore(persistedReducer, initState, enhancer);
storeRedux.__persistor = persistStore(storeRedux);

export default storeRedux;
