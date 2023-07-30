import React from "react";
import { useEffect, useState } from "react";
import SubmitButton from "../../components/Buttons/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/userActions";
import { Link, useNavigate, useLocation, } from "react-router-dom";
import "./LoginPage.css"
import Error from "../../components/error/Error";

function LoginPage({}) {
  const Location = useLocation();
  // const from = Location.state.from.pathName || '/'

  const Navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const redirect = Location.search ? Location.search.split("=")[1] : "/";
  const user = useSelector(state => state.userLogin.user)
  const loading = useSelector(state => state.userLogin.loading)
  const error = useSelector(state => state.userLogin.error)

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault()
    console.log(username, password)
    dispatch(login(username, password))
  }

  useEffect(() => {
    if (user) 
    {
      // Navigate(from, {replace:true});
      Navigate(redirect)
    }
  }, 
  [user, redirect]
  );

  return (
    <div>
      <div className="SignUpForm">
        <div className="SignUpLeft"></div>
        <div className="userformHeader ">
          <div className="SignUpRight">
          {error&&<Error error={error}/>}

            <h1>Welcome</h1>
            <p>Let's log you in quickly</p>
            <form onSubmit={submitHandler} className="actualForm">
              <div className="form-control">
                <label>
                  <input
                    name="name"
                    type="text"
                    value={username}
                    placeholder="username"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </label>
              </div>

              <div className="form-control">
                <label>
                  <input
                    name="name"
                    value={password}
                    type="password"
                    placeholder="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </label>
              </div>
              
              <div  className="form-control userFormFooter">
              <button className="" style={{ backgroundColor: "#6EEB83" }} type="submit">
      {loading ? <img width={25} className="" src="/images/loading2.gif"/>:<div>Login</div>}

    </button>
                <div className="userFormFooterLeft">
                  <span>Already have an account ?</span>
                  <div style={{ color: "#6EEB83" }}><Link to={'/signup'} className="sign--link">sign-up</Link></div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
