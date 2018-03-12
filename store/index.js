import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import defaultStore from './defaulStore';
import reducer from './reducer';

export const setLanguage = language => dispatch => {
  return dispatch({
    type: 'SET_LANGUAGE',
    language: language
  });
};

const initStore = (initialState = defaultStore) => {
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
      store.replaceReducer(reducer);
    });
  }

  return store;
};

export default initStore;
