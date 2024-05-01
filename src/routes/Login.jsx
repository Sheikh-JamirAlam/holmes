import { useState } from "react";
import { CrossInCircle, PhEye, PhEyeClosed } from "../components/Icons";
import "../styles/Login.css";

export default function Login() {
  const [isPassHidden, setIsPassHidden] = useState(true);

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
            <input type="email" placeholder="Enter email address" />
          </div>
          <div className="input">
            <input type={isPassHidden ? "password" : "text"} placeholder="Enter password" />
            <span onClick={() => setIsPassHidden(!isPassHidden)}>{isPassHidden ? <PhEyeClosed /> : <PhEye />}</span>
          </div>
          <button className="button">Sign in</button>
        </div>
        <p className="signup">
          Don't have an account? <a href="/signup">Sign up for free</a>
        </p>
      </div>
    </section>
  );
}
