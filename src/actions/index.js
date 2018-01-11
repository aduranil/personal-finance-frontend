import { adapter } from '../services'
import {
  ASYNC_START,
  LOGOUT_USER,
  SET_CURRENT_USER
} from "./types";

export const fetchUser = () => dispatch => {
  dispatch({type: ASYNC_START})
  adapter.auth.getCurrentUser().then(user => {
    dispatch({type: SET_CURRENT_USER, user})
  })
}

export const selectAccount = (id) =>  {
  return {type: 'SELECT_ACCOUNT', account: id}
}

export const fetchAccounts = (user_id) => dispatch => {
  adapter.auth.getAccounts().then(accounts => {
    let filteredAccounts = accounts.filter(account => account.user_id === user_id)
    dispatch({type: 'GET_ACCOUNTS', filteredAccounts})
  })
}

export const loginUser = (username, password, history) => dispatch => {
  dispatch({type: "ASYNC_START"})
  adapter.auth.login({username, password}).then(user => {
    if (user.error){
      alert(user.error)
    } else {
      localStorage.setItem('token', user.token)
      dispatch({type: SET_CURRENT_USER, user})
      history.push('/')
    }
  })
}

export const logoutUser = () => {
  localStorage.removeItem('token')
  return {type: LOGOUT_USER}
}
