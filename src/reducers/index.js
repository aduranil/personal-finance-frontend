import { combineReducers } from 'redux';

const initialState = { currentUser: {} }
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      const {id, username} = action.user
      return {...state, currentUser: {id, username}}
    case 'LOGOUT_USER':
      return {...state, currentUser: {}}
    default: return state;
  }
}

const rootReducer = combineReducers({ auth: authReducer })

export default rootReducer; 
