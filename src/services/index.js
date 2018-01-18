const API_ROOT = `http://localhost:3000`

const headers = {
  'Content-Type': 'application/json',
  Accepts: 'application/json'
}

const getWithToken = url => {
  const token = localStorage.getItem('token')
  return fetch(url, {
    headers: {Authorization: token}
  }).then(res => res.json())
}

const getCurrentUser = () => {
  return getWithToken(`${API_ROOT}/current_user`)
}

const login = data => {
  return fetch(`${API_ROOT}/login`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  }).then(res => res.json())
}

const getAccounts = () => {
  return fetch(`${API_ROOT}/accounts`, {
    headers: headers
  }).then(res => res.json())
}

const getTransactions = () => {
  return fetch(`${API_ROOT}/transactions`, {
    headers: headers
  }).then(res => res.json())
}

const createAccountsFromPlaid = (user_id, token, metadata) => {
  return fetch(`${API_ROOT}/authenticators`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({user_id, token, metadata})
  }).then(res => res.json())
}
const createUser = data => {
  return fetch(`${API_ROOT}/users`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  }).then(res => res.json())
}

const createTransaction = (data) => {
  let headersWithAuth = {...headers, 'Authorization': localStorage.getItem('token')}
  return fetch(`${API_ROOT}/transactions`, {
    method: 'POST',
    headers: headersWithAuth,
    body: JSON.stringify(data)
  }).then(res => res.json())
}

const deleteTransaction = (id, history) => {
  let headersWithAuth = {...headers, 'Authorization': localStorage.getItem('token')}
  return fetch(`${API_ROOT}/transactions/${id}`, {
    method: 'DELETE',
    headers: headersWithAuth
  }).then(res => res.json())
}

const deleteAccount = (id, history) => {
  let headersWithAuth = {...headers, 'Authorization': localStorage.getItem('token')}
  return fetch(`${API_ROOT}/accounts/${id}`, {
    method: 'DELETE',
    headers: headersWithAuth
  }).then(res => res.json())
}

const createAccount = (name, user_id) => {
  return fetch(`${API_ROOT}/accounts`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({name: name, user_id: user_id})
  }).then(res => res.json())
}

export const adapter = {
  auth: {
    login,
    getCurrentUser,
    getAccounts,
    getTransactions,
    createUser,
    createTransaction,
    createAccount,
    deleteTransaction,
    deleteAccount,
    createAccountsFromPlaid
  }
}
