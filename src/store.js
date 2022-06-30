import { createStore, compose, applyMiddleware } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import appReducers from "./reducers";

function configureStoreProd(initialState) {
  const middlewares = [thunkMiddleware];

  return createStore(
    appReducers,
    initialState,
    compose(applyMiddleware(...middlewares))
  );
}

function configureStoreDev(initialState) {
  const loggerMiddleware = createLogger({
    level: "info",
    collapsed: true,
    predicate: () => true,
  });

  const middlewares = [
    thunkMiddleware,
    loggerMiddleware,
    reduxImmutableStateInvariant(),
  ];

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const store = createStore(
    appReducers,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  return store;
}

const configureStore =
  process.env.NODE_ENV === "production"
    ? configureStoreProd
    : configureStoreDev;

const store = configureStore();
export default store;
