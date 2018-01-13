import { combineReducers } from 'redux';

const initialState = { currentUser: {}, isLoading: false}
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ASYNC_START':
      return {...state, isLoading: true}
    case 'SET_CURRENT_USER':
      const {id, username, accounts, account_balance, transactions} = action.user
      return {...state, currentUser: {id, username, accounts, account_balance, transactions}, isLoading: false}
    case 'LOGOUT_USER':
      return {...state, currentUser: {}}
    default:
      return state;
  }
}

const transactionsReducer = (state = {transaction:{}}, action) => {
  switch (action.type) {
    case 'SET_TRANSACTION':
      const {amount, category_name, merchant_name, account_name, period_name, debit_or_credit, account_id, category_id} = action.transaction
      return {...state, transaction: {amount, category_name, merchant_name, account_name, period_name, debit_or_credit, account_id, category_id}}
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
const accountsReducer = (state = {accounts: [], active_account: 1, account: []}, action) => {
  // console.log('IN THE ACCOUNTS REDUCER action', action)
  switch(action.type){
    case 'SELECT_ACCOUNT':
      let firstAccount = state.accounts.filter(account=>account.id === Number(action.account))
      return {...state, account: firstAccount}
    case 'GET_ACCOUNTS':
      return {...state, accounts: action.accounts}
    default:
      return state
  }
}

const categoriesReducer = (state = {categories:[]}, action) => {
  switch(action.type){
    case 'GET_CATEGORIES':
      return {...state, categories: action.categories}
    default:
      return state
  }
}

const rootReducer = combineReducers({
  auth: authReducer,
  accounts: accountsReducer,
  transactions: transactionsReducer,
  modal: modalReducer,
  categories: categoriesReducer
})

export default rootReducer;

// wherever dispatch is defined in the redux library
// it must look something like This
// const dispatch = (action) => {
//   reducer(state, action)
// }
