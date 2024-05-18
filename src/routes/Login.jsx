import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CrossInCircle, PhEye, PhEyeClosed } from "../components/Icons";
import "../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [isPassHidden, setIsPassHidden] = useState(true);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  async function handleLogin(e) {
    try {
      const getRes = await axios.post("http://localhost:8080/api/user/login", {
        userEmail: email,
        userPass: pass,
      });
      if (getRes.data === "Login successful") {
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section>
      <div className="login-container">
        <a className="close-cross" href="/">
          <CrossInCircle />
        </a>
        <h1 className="heading">Login</h1>
        <p>Enter your details to sign in to your account</p>
        <div className="input-container">
          <div className="input">
            <input type="email" placeholder="Enter email address" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input">
            <input type={isPassHidden ? "password" : "text"} placeholder="Enter password" value={pass} onChange={(e) => setPass(e.target.value)} />
            <span onClick={() => setIsPassHidden(!isPassHidden)}>{isPassHidden ? <PhEyeClosed /> : <PhEye />}</span>
          </div>
          <button className="button" onClick={handleLogin}>
            Sign in
          </button>
        </div>
        <p className="signup">
          Don't have an account? <a href="/signup">Sign up for free</a>
        </p>
      </div>
    </section>
  );
}
