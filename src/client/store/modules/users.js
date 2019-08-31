import { createAction, handleActions } from 'redux-actions';
import { call, put, takeEvery, takeLatest, actionChannel } from 'redux-saga/effects';

// Actions

// let addUser = createAction('ADD_NEW_USER', user => user);

const actions = { 
    addUser: createAction('ADD_NEW_USER', user => user),
    getUsers: createAction('FETCH_USERS') 
};

function* sagaFetchUsers(action){
    yield put({ type: 'FETCH_USERS_STARTED' });
    try {
        yield put({ type: 'FETCH_USERS_SUCCEEDED' });
    } catch (error) {
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
        users.push(action.payload);
        return Object.assign({}, state, { users: users });
    },
    'FETCH_USERS_SUCCEEDED': (state, action) => {
        console.log('FETCH_USERS_SUCCEEDED');
        return state;
    }
}, { users: [] });

export default { actions, reducers, rootSaga: rootSaga }