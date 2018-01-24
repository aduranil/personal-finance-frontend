import { adapter } from '../services'
import {
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
  adapter.auth.getCurrentUser().then(user => {
    dispatch({type: SET_CURRENT_USER, payload: user})
  })
}

export const createAccountsFromPlaid = (user_id, token, history) =>  dispatch => {
  adapter.auth.createAccountsFromPlaid(user_id, token).then(user => {
    dispatch({type: ADD_ACCOUNT, payload: user})
    dispatch({type: SET_CURRENT_USER, payload:user})
    history.push('/')
  })
}

export const modal = () => {
  return {type: TOGGLE_MODAL}
}

export const loaderModal = () => {
  return {type: 'TOGGLE_LOADER'}
}

export const sortTransactions = (transactions) => {
  return {type: SORT_TRANSACTIONS, transactions}
}

export const activeItem = (item) => {
  return {type: 'ACTIVE_ITEM', item }
}

export const filter = (item) => {
  return {type: 'FILTER', item}
}

export const filterTransactions = (transactions, event) => {
  return {type: 'FILTER_TRANSACTIONS', transactions, name: event.currentTarget.id, id: event.currentTarget.attributes[1].nodeValue}
}

export const filterByMany = (transactions, event) => {
  let name = event.nativeEvent.currentTarget.all[48].innerText.split(" : ")[0]
  let balance = event.nativeEvent.currentTarget.all[48].innerText.split(" : ")[1]
  return {type: 'FILTER_BY_MANY', transactions, name: name, balance: balance}
}

export const loginUser = (username, password, history) => dispatch => {
  adapter.auth.login({username, password}).then(user => {
    if (user.errors){
      dispatch({type: 'ERROR_MESSAGE', error: user.errors})
    } else {
      localStorage.setItem('token', user.token)
      dispatch({type: SET_CURRENT_USER, payload: user})
      history.push('/')
    }
  })
}

export const createUser = (username, password, history) => dispatch => {
  adapter.auth.createUser({username,password}).then(user => {
    if (user.errors){
      dispatch({type: 'ERROR_MESSAGE', error: user.errors})
    } else {
      localStorage.setItem('token', user.token)
      dispatch({type: SET_CURRENT_USER, payload:user})
      history.push('/')
    }
  })
}

export const createTransaction = (amount, category_name, merchant_name, account_name, period_name, debit_or_credit, account_id) => dispatch => {
  adapter.auth.createTransaction({amount, category_name, merchant_name, account_name, period_name, debit_or_credit, account_id}).then(user => {
    if (user.errors){
      dispatch({type: 'ERROR_MESSAGE', error: user.errors})
    } else {
      let data = {amount, category_name, merchant_name, account_name, period_name, debit_or_credit, account_id}
      dispatch({type: ADD_TRANSACTION, payload: user, id:account_id, transaction: data, name: account_name})
    }
  })
}

export const deleteTransaction = (id, account_id) => dispatch => {
  adapter.auth.deleteTransaction(id).then(user => {
    dispatch({type: DELETE_TRANSACTION, payload:user, id:id, account_id: account_id})
  })
}

export const createUpload = (user_id, file_upload) => dispatch => {
  adapter.auth.createUpload(user_id, file_upload).then(user => {
    dispatch({type: SET_CURRENT_USER, payload:user})
  })
}

export const addAccount = (name, user_id, balance, history) => dispatch => {
  adapter.auth.createAccount(name, user_id, balance).then(user => {
    if (user.errors) {
      alert(user.errors)
    } else {
      dispatch({type: ADD_ACCOUNT, payload: user})
      dispatch({type: SET_CURRENT_USER, payload:user})
      history.push('/')
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

export const removeFilterLabel = () => {
  return {type: 'REMOVE_LABEL'}
}
