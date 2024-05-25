import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { CrossInCircle, PhEye, PhEyeClosed } from "../components/Icons";
import "../styles/Login.css";

export default function Signup() {
  const navigate = useNavigate();
  const [isPassHidden, setIsPassHidden] = useState(true);
  const [isPassError, setIsPassError] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");

  useEffect(() => {
    if (Cookies.get("auth")) {
      navigate("/");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSignup(e) {
    if (pass !== cpass) {
      setIsPassError(true);
    } else {
      try {
        const getRes = await axios.get(`http://localhost:8080/api/user/getuser=${email}`);
        if (!getRes.data.userEmail) {
          const res = await axios.post("http://localhost:8080/api/user/signup", {
            userName: name,
            userContact: contact,
            userEmail: email,
            userPass: pass,
          });
          if (res.data === "Signup successful") {
            Cookies.set("auth", email, { expires: 7 });
            navigate("/");
          }
        } else {
          navigate("/login");
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <section>
      <div className="login-container signup-container">
        <a className="close-cross" href="/">
          <CrossInCircle />
        </a>
        <h1 className="heading">Signup</h1>
        <p>Enter your details to create your account</p>
        <div className="input-container">
          <div className="input">
            <input type="text" placeholder="Enter full name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="input">
            <input type="number" placeholder="Enter phone number" value={contact} onChange={(e) => setContact(e.target.value)} />
          </div>
          <div className="input">
            <input type="email" placeholder="Enter email address" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input">
            <input
              type={isPassHidden ? "password" : "text"}
              placeholder="Enter password"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
                setIsPassError(false);
              }}
            />
            <span onClick={() => setIsPassHidden(!isPassHidden)}>{isPassHidden ? <PhEyeClosed /> : <PhEye />}</span>
          </div>
          <div className={`input ${isPassError && "pass-error"}`}>
            <input
              type={isPassHidden ? "password" : "text"}
              placeholder="Confirm password"
              value={cpass}
              onChange={(e) => {
                setCpass(e.target.value);
                setIsPassError(false);
              }}
            />
            <span onClick={() => setIsPassHidden(!isPassHidden)}>{isPassHidden ? <PhEyeClosed /> : <PhEye />}</span>
          </div>
          <button className="button" onClick={handleSignup}>
            Create Account
          </button>
        </div>
        <p className="signup">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </section>
  );
}
