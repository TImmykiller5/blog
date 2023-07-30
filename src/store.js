import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { UserLoginReducers, UserRegistereducers } from "./redux/reducers/userReducers";

const reducer = combineReducers({
    userLogin : UserLoginReducers,
    userRegister : UserRegistereducers,
})

const localUser = localStorage.getItem('user') ? 
    JSON.parse(localStorage.getItem('user')) : null

const initialState = {
    userLogin : {user:localUser}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middleware)))


export default store