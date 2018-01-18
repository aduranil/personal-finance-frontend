import { combineReducers } from 'redux';

const initialState = { currentUser: {}, isLoading: false, transaction: {}}
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ASYNC_START':
      return {...state, isLoading: true}
    case 'SET_CURRENT_USER':
      const {id, username, accounts, account_balance, transactions, spend_by_month, merchant_expense_data,merchant_frequency, average_spend,category_expense_data, category_frequency, category_name, merchant_name} = action.user
      return {...state, currentUser: {id, username, accounts, account_balance, transactions, spend_by_month, merchant_frequency, average_spend,category_expense_data, category_frequency, merchant_expense_data, merchant_name, category_name}, isLoading: false}
    case 'DELETE_TRANSACTION':
      let newCurrentUser = Object.assign({}, state.currentUser, {})
      newCurrentUser.transactions = state.currentUser.transactions.filter(transaction => transaction.id !== action.id)
      return {...state, currentUser: newCurrentUser}
    case 'ADD_TRANSACTION':
      let thisCurrentUser = Object.assign({}, state.currentUser, {})
      thisCurrentUser.transactions = state.currentUser.transactions.concat(action.transaction)
      thisCurrentUser.account_balance = thisCurrentUser.account_balance - action.transaction.amount
      return {...state, currentUser: thisCurrentUser}
    case 'SORT_TRANSACTIONS':
      let newUser = Object.assign({}, state.currentUser, {transactions: action.transactions})
      return {...state, currentUser: newUser}
    case 'ADD_ACCOUNT':
      newCurrentUser = Object.assign({}, state.currentUser, {})
      newCurrentUser.accounts = state.currentUser.accounts.concat(action.account)
      return {...state, currentUser: newCurrentUser}
    case 'LOGOUT_USER':
      return {...state, currentUser: {}}
    default:
      return state;
  }
}

const modalReducer = (state = {modalOpen: false}, action) =>  {
  switch (action.type){
    case 'TOGGLE_MODAL':
      return {...state, modalOpen: !state.modalOpen}
    default:
      return state;
  }
}
const accountsReducer = (state = {accounts: [], account: []}, action) => {
  switch(action.type){
    case 'SELECT_ACCOUNT':
      let firstAccount = state.accounts.find(account=>account.id === Number(action.account))
      return {...state, account: firstAccount}
    case 'UPDATE_ACCOUNT':
      let updatedAccount = Object.assign({}, state.account, {transactions: action.transactions})
      return {...state, account: updatedAccount}
    case 'GET_ACCOUNTS':
      return {...state, accounts: action.accounts}
    default:
      return state
  }
}

const rootReducer = combineReducers({
  auth: authReducer,
  accounts: accountsReducer,
  modal: modalReducer
})

export default rootReducer;

// wherever dispatch is defined in the redux library
// it must look something like This
// const dispatch = (action) => {
//   reducer(state, action)
// }
