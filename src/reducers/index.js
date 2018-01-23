import { combineReducers } from 'redux';

const initialState = { currentUser: {}, isLoading: false,  filtered: undefined, periodOptions: [], accountOptions: [],  category_name: [], merchant_name: [], name: 'All', balance: null}
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ASYNC_START':
      return {...state, isLoading: true}
    case 'ERROR_MESSAGE':
      debugger;
      return {...state, errors: action.error}
    case 'SET_CURRENT_USER':
      if (action.payload && action.payload.transactions) {
        let periodNames = [...new Set(action.payload.transactions.map(transaction => transaction.period_name))]
        let categoryNames = [...new Set(action.payload.transactions.map(transaction => transaction.category_name))]
        let merchantNames = [...new Set(action.payload.transactions.map(transaction => transaction.merchant_name))]
        let periodData = []
        let accountData = []
        let category_name = []
        let merchant_name = []
        periodNames.map((date, index) => {
          return periodData.push({key: index, text: date, value: date, id:date, name: date, name2: 'period_name'})
        })
        categoryNames.map((category, index) => {
          return category_name.push({key: index, text: category, value: category, id:category, name: category, name2: 'category_name'})
        })
        merchantNames.map((merchant, index) => {
          return merchant_name.push({key: index, text: merchant, value: merchant, id:merchant, name: merchant, name2: 'merchant_name'})
        })
        action.payload.accounts.map((account, index) => {
          return accountData.push({key: index, text: account.name, value: account.name, id:account.name, name: account.id, name2: 'account_name', name3: account.balance})
        })
        if (state.filtered) {
          return {...state, currentUser: action.payload, periodOptions: periodData, category_name: category_name, merchant_name: merchant_name, accountOptions: accountData}
        } else {
          return {...state, currentUser: action.payload, periodOptions: periodData, category_name: category_name, merchant_name: merchant_name, accountOptions: accountData, balance: action.payload.data.account_balance}
        }
      } else {
        return {...state, currentUser: action.payload}
      }
    case 'DELETE_TRANSACTION':
      if (state.filtered) {
        let accountBalance = action.payload.accounts.find(account => account.id === action.account_id).balance
        return {...state, currentUser: action.payload, filtered: state.filtered.filter(transaction => transaction.id !== action.id), balance: accountBalance}
      } else {
        return {...state, currentUser: action.payload, balance: action.payload.data.account_balance}
      }
    case 'ADD_TRANSACTION':
      if (state.filtered) {
        let withTransactions = action.payload.accounts.find(account => account.id === action.id).balance
        return {...state, currentUser: action.payload, filtered: action.payload.transactions.filter(transaction => transaction.account_id === action.id), balance: withTransactions}
      } else {
        return {...state, currentUser: action.payload, balance: action.payload.data.account_balance}
      }
    case 'SORT_TRANSACTIONS':
      if (state.filtered) {
        return {...state, filtered: action.transactions}
      } else {
        let newUser = Object.assign({}, state.currentUser, {transactions: action.transactions})
        return {...state, currentUser: newUser}
      }
    case 'FILTER_TRANSACTIONS':
      let data
      let balance
        if (action.id == 'All') {
          data = undefined
          balance = state.currentUser.data.account_balance
        } else {
          data = action.transactions
          balance = action.balance
        }
      return {...state, filtered: data, name:action.id, balance: balance}
    case 'FILTER_BY_MANY':
      return {...state, filtered: action.transactions, name: action.name, balance: parseFloat(action.balance.replace(/,/g, ''))}
    case 'DELETE_ACCOUNT':
      if (state.filtered && state.filtered.length > 0 && state.filtered[0].account_id !== Number(action.id)) {
        let id = state.filtered[0].account_id
        let deleteBalance = action.payload.accounts.find(account => account.id === id).balance
        return {...state, currentUser: action.payload, balance: deleteBalance}
      } else {
        return {...state, currentUser: action.payload, balance: action.payload.data.account_balance, name: 'All', filtered:undefined}
      }
    case 'ADD_ACCOUNT':
      if (state.filtered) {
        debugger;
        return {...state, currentUser: action.payload, balance:  action.payload.accounts.find(account => account.name.toLowerCase() === state.name.toLowerCase()).balance}
      } else {
        return {...state, currentUser: action.payload, balance: action.payload.data.account_balance}
      }
    case 'LOGOUT_USER':
      return {...state, currentUser: {}}
    default:
      return state;
  }
}

const modalReducer = (state = {modalOpen: false, loaderOpen:false}, action) =>  {
  switch (action.type){
    case 'TOGGLE_MODAL':
      return {...state, modalOpen: !state.modalOpen}
    case 'TOGGLE_LOADER':
      return {...state, loaderOpen: !state.loaderOpen}
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer
})

export default rootReducer;
