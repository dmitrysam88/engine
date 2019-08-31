import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import usersModule from './modules/users';
import createSagaMiddleware from 'redux-saga'

let reducers = combineReducers({ users: usersModule.reducers });

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(sagaMiddleware);

const store = createStore(reducers, composeWithDevTools(middleware));

sagaMiddleware.run(usersModule.rootSaga);

export default store;