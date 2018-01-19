import { combineReducers } from 'redux';

const initialState = { currentUser: {}, isLoading: false,  filtered: undefined, periodOptions: [], accountOptions: [],  category_name: [], merchant_name: [], name: 'All', balance: null}
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ASYNC_START':
      return {...state, isLoading: true}
    case 'SET_CURRENT_USER':
      let periodNames = [...new Set(action.user.transactions.map(transaction => transaction.period_name))]
      let categoryNames = [...new Set(action.user.transactions.map(transaction => transaction.category_name))]
      let merchantNames = [...new Set(action.user.transactions.map(transaction => transaction.merchant_name))]
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
      action.user.accounts.map((account, index) => {
        return accountData.push({key: index, text: account.name, value: account.name, id:account.name, name: account.id, name2: 'account_name', name3: account.balance})
      })
      return {...state, currentUser: action.user, periodOptions: periodData, category_name: category_name, merchant_name: merchant_name, accountOptions: accountData, balance: action.user.account_balance }
    case 'DELETE_TRANSACTION':
      return {...state, currentUser: action.payload}
    case 'ADD_TRANSACTION':
      return {...state, currentUser: action.payload}
    case 'SORT_TRANSACTIONS':
      let newUser = Object.assign({}, state.currentUser, {transactions: action.transactions})
      return {...state, currentUser: newUser}
    case 'FILTER_TRANSACTIONS':
      let data
        if (action.id == 'All') {
          data = undefined
        } else {
          data = action.transactions
        }
      return {...state, filtered: data, name:action.id, balance: action.balance}
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



const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer
})

export default rootReducer;

// wherever dispatch is defined in the redux library
// it must look something like This
// const dispatch = (action) => {
//   reducer(state, action)
// }
