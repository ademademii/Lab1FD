import React, { useEffect, useState, useRef } from 'react';
import useAuth from './hooks/useAuth';

import './styles/login.css';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios, { axiosPrivate } from './api/axios';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './styles/register.css'
import useAxiosPrivate from "./hooks/useAxiosPrivate";

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%*_]).{8,24}$/;

function LoginForm(props) {
  //const axiosPrivate = useAxiosPrivate();

  const [isLoading, setIsLoading] = useState(false);

  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);


  const [redirect, setRedirect] = useState(false)
  const [role, setRole] = useState('')

  const [errMsg, setErrMsg] = useState('');


  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email])

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
  }, [password])

  useEffect(() => {
    setErrMsg('');
  }, [email, password])

  let validData = !validEmail || !validPassword ? true : false;


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password
    }

    try {
      setIsLoading(true);
      const response = await axios.post('/api/authmanagement/login',
        data,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      const accessToken = response?.data?.token;
      const refreshToken = response?.data?.refreshToken;
      const roles = response?.data?.roles;
      const username = response.data.user.userName;

      localStorage.setItem('roles', roles);
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
      localStorage.setItem('id', response.data.user.id);

      setAuth({ username, email, password, roles, accessToken });
      navigate(from, { replace: true });
      if (from === '/') {
        if (roles.includes('Administrator')) {
          navigate('admin');
        } else if (roles.includes('Restorant')) {
          navigate('restorantidashboard');
        } else if(roles.includes('Klient')){
          navigate('shfletorestorantet');
        }else{
          navigate('menu');
        }
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg('Serveri nuk ktheu pergjigje!');
      } else if (err.response?.status === 400) {
        setErrMsg('Te dhenat jane gabim');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Kyqja ne sistem Deshtoi');
      }
      setIsLoading(false);
    }
  }

  const togglePersist = () => {
    setPersist(prev => !prev)
  }

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist])

  return (
    <>
      <div className="d-flex justify-content-center align-content-center external">
        {
          isLoading
            ? <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            : <form onSubmit={handleSubmit} autoComplete="off">
              <div className="w-300">
                {/*Alert Box*/}
                <div ref={errRef} className={errMsg ? "alert alert-danger" : "collapse"} role="alert" aria-live="assertive">
                  {errMsg}
                </div>
                <h2>Login</h2>
                <div className="form-outline mb-8">
                  <label htmlFor="email" className="form-label">Email
                    <span className={validEmail ? "valid" : "collapse"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validEmail || !email ? "collapse" : "invalid"}>
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    name="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-outline mb-2">
                  <label htmlFor="password" className="form-label">Password
                    <span className={validPassword ? "valid" : "collapse"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validPassword || !password ? "collapse" : "invalid"}>
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    name="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={togglePersist}
                    checked={persist}
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">Trust this Device</label>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-2"
                  disabled={validData || isLoading}
                >
                  Sign in
                </button>
                <p>ose</p>
                <Link to='/klientiRegister'><button className='btn btn-info'>Regjistrohu</button></Link>
              </div>
            </form>
              }
          </div>
    </>
  )

}

export default LoginForm;
