import axios from 'axios'

export const LOGIN_USER = 'LOGIN_USER'

export const LOGOUT_USER = 'LOGOUT_USER'

const ROOT_LOGIN = `http://localhost:5885/api/login`

const ROOT_LOGOUT = `http://localhost:5885/api/logout`

export function loginUserFunc (email,password) {
  const loginUser = axios.post(`${ROOT_LOGIN}`, {
    email,
    password
  })
  .then((response) => {
    window.location = response.data;
  })

  return {
    type: LOGOUT_USER,
    payload: loginUser
  }
}

export function logOutUsrFunc (userId) {
  const logOutUser = axios.get(`${ROOT_LOGOUT}`, {
    userId
  })
  .then((response) => {
    window.location = response.data;
  })

  return {
    type: LOGOUT_USER,
    payload: logOutUser
  }
}
