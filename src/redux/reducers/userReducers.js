import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../constants/userConstants";
import { Navigate } from "react-router-dom";

export const UserLoginReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS: {
      return { loading: false, user: action.payload };
    }

    case USER_LOGIN_FAIL: {
      return { loading: false, error: action.payload };
    }

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }

  
};

export const UserRegistereducers = (state = {}, action) => {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return { loading: true };

      case USER_REGISTER_SUCCESS: {

        return { loading: false, user: action.payload };
      }

      case USER_REGISTER_FAIL: {
        return { loading: false, error: action.payload };
      }

      case USER_LOGOUT:
        return {};

      default:
        return state;
    }
  };
