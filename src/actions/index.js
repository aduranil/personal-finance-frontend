import { adapter } from '../services'
import {
  ASYNC_START,
  LOGOUT_USER,
  SET_CURRENT_USER,
  SELECT_ACCOUNT,
  TOGGLE_MODAL,
  GET_ACCOUNTS,
  DELETE_TRANSACTION,
  ADD_TRANSACTION,
  ADD_ACCOUNT,
  SORT_TRANSACTIONS
} from "./types";


export const fetchUser = () => dispatch => {
  dispatch({type: ASYNC_START})
  adapter.auth.getCurrentUser().then(user => {
    dispatch({type: SET_CURRENT_USER, user})
  })
}

export const selectAccount = (id) =>  {
  return {type: SELECT_ACCOUNT, account: id}
}

export const modal = () => {
  return {type: TOGGLE_MODAL}
}


export const sortTransactions = (transactions) => {
  return {type: SORT_TRANSACTIONS, transactions }
}

export const fetchAccounts = () => dispatch => {
  adapter.auth.getAccounts().then(accounts => {
    dispatch({type: GET_ACCOUNTS, accounts})
  })
}


export const loginUser = (username, password, history) => dispatch => {
  dispatch({type: ASYNC_START})
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

export const addAccount = (name, user_id) => dispatch => {
  adapter.auth.createAccount(name, user_id)
  .then(account => {
    if (account.error) {
      alert(account.error)
    } else {
      dispatch({type: ADD_ACCOUNT, account})
    }
  })
}

export const updateAccount = (transactions) => {
  return {type: 'UPDATE_ACCOUNT', transactions}
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

export const createTransaction = (amount, category_name, merchant_name, account_name, period_name, debit_or_credit, account_id, history) => dispatch => {
  adapter.auth.createTransaction({amount, category_name, merchant_name, account_name, period_name, debit_or_credit, account_id}).then(user => {
    if (user.error){
      alert(user.error)
    } else {
      dispatch({type: ADD_TRANSACTION, payload: user, id:account_id})
    }
  })
}

export const deleteTransaction = (id, history, account_id) => dispatch => {
  adapter.auth.deleteTransaction(id).then(user => {
    dispatch({type: DELETE_TRANSACTION, payload:user, id:id, account_id: account_id})
  })
}

export const deleteAccount = (id, history) => dispatch => {
  adapter.auth.deleteAccount(id).then(user => {
    dispatch({type: "DELETE_ACCOUNT", payload: user, id: id})
  })
}
export const logoutUser = () => {
  localStorage.removeItem('token')
  return {type: LOGOUT_USER}
}
