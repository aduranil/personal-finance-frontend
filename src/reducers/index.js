import { combineReducers } from 'redux';

const initialState = { currentUser: {}, isLoading: false, categories: [], filtered: []}
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ASYNC_START':
      return {...state, isLoading: true}
    case 'SET_CURRENT_USER':
      // let data =action.user.category_name.map((category, index) => {
      //   return {key: index, text: category, value: category, name:category}
      // })
      return {...state, currentUser: action.user}
    case 'DELETE_TRANSACTION':
      return {...state, currentUser: action.payload}
    case 'ADD_TRANSACTION':
      return {...state, currentUser: action.payload}
    case 'SORT_TRANSACTIONS':
      let newUser = Object.assign({}, state.currentUser, {transactions: action.transactions})
      // let newUser = {...state.currentUser, transcations: action.transactions}
      return {...state, currentUser: newUser}
    case 'FILTER_TRANSACTIONS':
      return {...state, filtered: action.transactions}
    case 'DELETE_ACCOUNT':
      return {...state, currentUser: action.payload}
    case 'ADD_ACCOUNT':
      let newCurrentUser = Object.assign({}, state.currentUser, {})
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
    case 'ADD_ACCOUNT':
      return {...state, accounts: state.accounts.concat(action.account)}
    case 'DELETE_ACCOUNT':
      if (state.account.id === parseInt(action.id,10)){
        return {...state, account: undefined}
      } else {
        return state
      }
    case 'ADD_TRANSACTION':
      let account = action.payload.accounts.find(account => account.id === action.id)
      let balance = account.balance
      let transactionsHere = action.payload.transactions.filter(transaction=> transaction.account_id === account.id)
      account.transactions = transactionsHere
      let accountFinal = Object.assign({}, account, {transactions:transactionsHere, balance: balance})
      return {...state, account: accountFinal}
    case 'DELETE_TRANSACTION':
      account = action.payload.accounts.find(account => account.id === action.account_id)
      balance = account.balance
      transactionsHere = action.payload.transactions.filter(transaction=> transaction.account_id === account.id)
      account.transactions = transactionsHere
      accountFinal = Object.assign({}, account, {transactions:transactionsHere, balance: balance})
      return {...state, account: accountFinal}
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
