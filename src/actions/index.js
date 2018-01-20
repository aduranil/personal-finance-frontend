import { adapter } from '../services'
import {
  ASYNC_START,
  LOGOUT_USER,
  SET_CURRENT_USER,
  TOGGLE_MODAL,
  DELETE_TRANSACTION,
  ADD_TRANSACTION,
  ADD_ACCOUNT,
  SORT_TRANSACTIONS,
  DELETE_ACCOUNT
} from "./types";

export const fetchUser = () => dispatch => {
  dispatch({type: ASYNC_START})
  adapter.auth.getCurrentUser().then(user => {
    dispatch({type: SET_CURRENT_USER, payload: user})
  })
}

export const modal = () => {
  return {type: TOGGLE_MODAL}
}

export const sortTransactions = (transactions) => {
  return {type: SORT_TRANSACTIONS, transactions}
}

export const filterTransactions = (transactions, event) => {
  return {type: 'FILTER_TRANSACTIONS', transactions, id: event.currentTarget.innerText, balance: event.currentTarget.attributes[1].nodeValue}
}

export const loginUser = (username, password, history) => dispatch => {
  dispatch({type: ASYNC_START})
  adapter.auth.login({username, password}).then(user => {
    if (user.error){
      alert(user.error)
    } else {
      localStorage.setItem('token', user.token)
      dispatch({type: SET_CURRENT_USER, payload: user, balance: user.account_balance})
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
      dispatch({type: SET_CURRENT_USER, payload:user})
      history.push('/')
    }
  })
}

export const createTransaction = (amount, category_name, merchant_name, account_name, period_name, debit_or_credit, account_id) => dispatch => {
  adapter.auth.createTransaction({amount, category_name, merchant_name, account_name, period_name, debit_or_credit, account_id}).then(user => {
    if (user.error){
      alert(user.error)
    } else {
      let data = {amount, category_name, merchant_name, account_name, period_name, debit_or_credit, account_id}
      dispatch({type: ADD_TRANSACTION, payload: user, id:account_id, transaction: data})
    }
  })
}

export const deleteTransaction = (id, account_id) => dispatch => {
  adapter.auth.deleteTransaction(id).then(user => {
    dispatch({type: DELETE_TRANSACTION, payload:user, id:id, account_id: account_id})
  })
}

export const addAccount = (name, user_id, history) => dispatch => {
  adapter.auth.createAccount(name, user_id)
  .then(user => {
    if (user.error) {
      alert(user.error)
    } else {
      dispatch({type: ADD_ACCOUNT, payload: user})
      dispatch({type: SET_CURRENT_USER, payload:user})
    }
  })
}

export const deleteAccount = (id, history) => dispatch => {
  adapter.auth.deleteAccount(id).then(user => {
    dispatch({type: DELETE_ACCOUNT, payload: user, id: id})
    dispatch({type: SET_CURRENT_USER, payload:user})
  })
}
export const logoutUser = () => {
  localStorage.removeItem('token')
  return {type: LOGOUT_USER}
}
