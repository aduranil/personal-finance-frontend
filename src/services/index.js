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

const getCategories = () => {
  return fetch(`${API_ROOT}/categories`, {
    headers: headers
  }).then(res => res.json())
}

const getTransactions = () => {
  return fetch(`${API_ROOT}/transactions`, {
    headers: headers
  }).then(res => res.json())
}

const createUser = data => {
  return fetch(`${API_ROOT}/users`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  }).then(res => res.json())
}

const createTransaction = data => {
  debugger;
  return fetch(`${API_ROOT}/transactions`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  }).then(res => res.json())
}

export const adapter = {
  auth: {
    login,
    getCurrentUser,
    getAccounts,
    getTransactions,
    createUser,
    getCategories,
    createTransaction
  }
}
