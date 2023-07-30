import "./SignUp.css";
import { useEffect, useState } from "react";
import Error from "../../components/error/Error";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation, redirect } from "react-router-dom";
import { register } from "../../redux/actions/userActions";

function SignUp() {
  const Location = useLocation();
  const redirect = Location.search ? Location.search.split("=")[1] : "/";
  const loading = useSelector(state => state.userRegister.loading)
  const error = useSelector(state => state.userRegister.error)
  // console.log(error)

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const Navigate = useNavigate()
  const user = useSelector(state => state.userLogin.user)
  const submitHandler = (e) => {
    e.preventDefault();
    
    console.log(username, password);
    dispatch(register(username, email, password));

  };

  useEffect(() => {
    if (user) {
      Navigate(redirect);
    }
  }, [user, redirect, error]);

  return (
    <div className="SignUpForm">
      
      <div className="SignUpLeft"></div>
      <div className="userformHeader">
        <div className="SignUpRight">
          {error&&<Error error={error}/>}
          
          <h1 className="my-2">Welcome</h1>
          <p className="my-2">Let's sign you up quickly</p>
          <form onSubmit={submitHandler} className="actualForm">
            <div className="form-control">
              <label>
                <input
                required
                  name="name"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  value={username}
                  type="text"
                  placeholder="username"
                />
              </label>
            </div>
            <div className="form-control">
              <label>
                <input
                required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                  name="name"
                  type="email"
                  placeholder="email"
                />
              </label>
            </div>
            <div className="form-control">
              <label>
                <input
                required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                  name="name"
                  type="password"
                  placeholder="password"
                />
              </label>
            </div>
            <div className="form-control">
              <label>
                <input
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                value={ConfirmPassword}
                required
                  name="name"
                  type="password"
                  placeholder="confirm password"
                />
              </label>
            </div>
            <div className="form-control userFormFooter">
            <button className="" style={{ backgroundColor: "#6EEB83" }} type="submit">
      {loading ? <img width={25} className="" src="/images/loading2.gif"/>:<div>Sign-up</div>}

    </button>
              <div className="userFormFooterLeft">
                <span>Already have an account ?</span>
                <div style={{ color: "#6EEB83" }}>
                  <Link to={"/login"} className="sign--link">
                    log-in
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
