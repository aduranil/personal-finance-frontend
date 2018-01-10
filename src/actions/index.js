import { adapter } from '../services'
import {
  ASYNC_START,
  LOGIN_USER,
  LOGOUT_USER,
  SET_CURRENT_USER
} from "./types";

export const loginUser = (username, password, history) => dispatch => {
  dispatch({type: ASYNC_START})
  adapter.auth.login({username, password}).then(user => {
    localStorage.setItem('token', user.jwt)
    dispatch({type: SET_CURRENT_USER, user})
  })
}
