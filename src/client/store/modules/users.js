import { createAction, handleActions } from 'redux-actions';
import { call, put, takeEvery, takeLatest, actionChannel } from 'redux-saga/effects';
import axios from 'axios';

// Actions

// let addUser = createAction('ADD_NEW_USER', user => user);

const actions = { 
    addUser: createAction('ADD_NEW_USER', (user) => { return { user }}),
    getUsers: createAction('FETCH_USERS') 
};

function* sagaFetchUsers(action){
    yield put({ type: 'FETCH_USERS_STARTED' });
    try {
        let result = yield axios.get('http://localhost:3000/api/users');
        yield put({ type: 'FETCH_USERS_SUCCEEDED', payload: { users: result.data }});
    } catch (error) {
        console.log(error);
        yield put({ type: 'FETCH_USERS_ERROR' });
    }
}

// // Sagas
function* rootSaga(){
    yield takeEvery('FETCH_USERS', sagaFetchUsers)
}

// Reducers

const reducers = handleActions({
    'ADD_NEW_USER': (state, action) => {
        let users = state.users.slice();
        users.push(action.payload.user);
        return Object.assign({}, state, { users: users });
    },
    'FETCH_USERS_SUCCEEDED': (state, action) => {        
        return Object.assign({}, state, { users: action.payload.users });
    }
}, { users: [] });

export default { actions, reducers, rootSaga: rootSaga }