import { combineReducers } from 'redux';

const initialState = { currentUser: {}, isLoading: false}
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ASYNC_START':
      return {...state, isLoading: true}
    case 'SET_CURRENT_USER':
      const {id, username} = action.user
      return {...state, currentUser: {id, username}, isLoading: false}
    case 'LOGOUT_USER':
      return {...state, currentUser: {}}
    default:
      return state;
  }
}

const accountsReducer = (state = {accounts: [], active_account: null}, action) => {
  // console.log('IN THE ACCOUNTS REDUCER action', action)
  switch(action.type){
    case 'GET_ACCOUNTS':
      return {...state, accounts: action.filteredAccounts}
    case 'SELECT_ACCOUNT':
      return {...state, active_account: action.account}
    default:
      return state
  }
}

const rootReducer = combineReducers({
  auth: authReducer,
  accounts: accountsReducer
})

export default rootReducer;

// wherever dispatch is defined in the redux library
// it must look something like This
// const dispatch = (action) => {
//   reducer(state, action)
// }
