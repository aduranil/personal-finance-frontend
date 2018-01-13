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

export const modal = () => {
  return {type: 'TOGGLE_MODAL'}
}

export const fetchAccounts = () => dispatch => {
  adapter.auth.getAccounts().then(accounts => {
    dispatch({type: 'GET_ACCOUNTS', accounts})
  })
}

export const getCategories = () => dispatch => {
  adapter.auth.getCategories().then(categories => {
    dispatch({type: 'GET_CATEGORIES', categories})
  })
}

// export const fetchTransactions = () => dispatch => {
//   adapter.auth.getTransactions().then(transactions => {
//     dispatch({type: 'GET_TRANSACTIONS', transactions})
//   })
// }

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

export const createUser = (username, password, history) => dispatch => {
  adapter.auth.createUser({username,password}).then(user => {
    if (user.error){
      alert(user.error)
    } else {
      localStorage.setItem('token', user.token)
      dispatch({type: SET_CURRENT_USER, user})
      history.push('/')
    }
  })
}

export const createTransaction = (amount, category_name, merchant_name, account_name, period_name, debit_or_credit, account_id, category_id) => dispatch => {
  adapter.auth.createTransaction({amount, category_name, merchant_name, account_name, period_name, debit_or_credit, account_id, category_id}).then(transaction => {
    if (transaction.error){
      alert(transaction.error)
    } else {
      dispatch({type: 'SET_TRANSACTION', transaction})
    }
  })
}


export const logoutUser = () => {
  localStorage.removeItem('token')
  return {type: LOGOUT_USER}
}
