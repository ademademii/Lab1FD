import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './styles/register.css';
import axios from './api/axios';

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%*_]).{8,24}$/;

const KlientiRegister = () => {
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = USERNAME_REGEX.test(username);
        setValidName(result);
    }, [username])

    useEffect(() => {
        const result = PWD_REGEX.test(password);
        setValidPassword(result);
        const match = password === matchPassword;
        if(matchPassword !== ''){
            setValidMatch(match)
        }
    }, [password, matchPassword])

    useEffect(() => {
        setErrMsg('');
    }, [username, password, matchPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();
        //nese butoni behet 'enabled' me javascript
        const v1 = USERNAME_REGEX.test(username);
        const v2 = EMAIL_REGEX.test(email);
        const v3 = PWD_REGEX.test(password);

        const data = {
            username: username,
            email: email,
            password: password,
            roli: 'Klient'
        }

        if (!v1 || !v2 || !v3) {
            setErrMsg("Te dhenat jo valide");
            return;
        }
        try{
            const response = await axios.post('/api/authmanagement/register', 
            data,
            {
                headers: { 'Contenct-Type': 'application/json'},
                withCredentials: true
            });
            setSuccess(true);
            //clear input fields
        }catch(err){
            if(!err?.response){
                setErrMsg('Nuk ka pergjigje nga serveri');
            }else if(err.response.status === 404){
                setErrMsg('Regjistrimi deshtoi')
            }else{
                setErrMsg(err.response.data.errors)
            }
        }
    }
    return (
        <>
            {success ? (
                <div className="alert alert-success" role="alert">
                    <h1>Jeni Regjistruar Me Sukses!</h1>
                    <Link to='/' className="alert-link">Kyqu Ketu</Link>
                </div>
            ) : (
                <div className="d-flex justify-content-center align-content-center">
                    <form className="row g-3 d-flex w-50 mt-4 mb-3" onSubmit={handleSubmit}>
                        <nav className="navbar bg-light">
                            <button className="btn btn-sm btn-outline-secondary" type="button"><Link to="/klientiregister" >Klient</Link></button>
                            <button className="btn btn-sm btn-outline-secondary" type="button"><Link to="/restorantiregister" >Restorant</Link></button>
                            <button className="btn btn-sm btn-outline-secondary" type="button"><Link to="/transportuesiregister" >Transportues</Link></button>
                        </nav>
                        {/*Alert Box*/}
                        <div ref={errRef} className={errMsg ? "alert alert-danger" : "collapse"} role="alert" aria-live="assertive">
                            {errMsg}
                        </div>
                        <h1>Regjistrohu Si Klient!</h1>
                        <div className="col-sm-12 align-self">
                            <label htmlFor="inputEmail4" className="form-label">Email
                                <span className={validEmail ? "valid" : "collapse"}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validEmail || !email ? "collapse" : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="inputEmail4"
                                autoComplete="off"
                                onChange={e => setEmail(e.target.value)}
                                required
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby="emnote"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                            />
                            <div id="emnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                EMAIL NUK ESHTE VALID.
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <label htmlFor="inputPassword4" className="form-label">Password
                                <span className={validPassword ? "valid" : "collapse"}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validPassword || !password ? "collapse" : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="inputPassword4"
                                onChange={e => setPassword(e.target.value)}
                                required
                                aria-invalid={validPassword ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPasswordFocus(true)}
                                onBlur={() => setPasswordFocus(false)}
                            />
                            <div id="pwdnote" className={passwordFocus && password && !validPassword ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Password duhet te jete 8-24 Karaktere<br />
                                Password duhet te permbaje min. 1 shkronje te madhe<br />
                                Password duhet te permbaje min 1 numer<br />
                                Password duhet te permbaje min 1 karakter special e.g. '<span aria-label="pikëquditëse">!</span>,
                                <span aria-label="vizë">_</span>, <span aria-label="hashtag">#</span>, $'
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <label htmlFor="confirm_pwd" className="form-label">Konfirmo Password-in
                                <span className={validMatch ? "valid" : "collapse"}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validMatch || !matchPassword ? "collapse" : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirm_pwd"
                                onChange={e => setMatchPassword(e.target.value)}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmpwdnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <div id="confirmpwdnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Passwordi nuk përputhet.
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <label htmlFor="username" className="form-label">Username
                                <span className={validName ? "valid" : "collapse"}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validName || !username ? "collapse" : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                autoComplete="off"
                                onChange={e => setUsername(e.target.value)}
                                required
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            <div id="uidnote" className={userFocus && username && !validName ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Username duhet te jete 4-24 Karaktere
                            </div>
                        </div>

                        <div className="col-12">
                            <button type="submit" className="btn btn-primary" disabled={!validEmail || !validName || !validPassword || !validMatch ? true : false}>Regjistrohu</button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}

export default KlientiRegister;