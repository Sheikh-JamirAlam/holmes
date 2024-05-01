import { useState } from "react";
import { CrossInCircle, PhEye, PhEyeClosed } from "../components/Icons";
import "../styles/Login.css";

export default function Signup() {
  const [isPassHidden, setIsPassHidden] = useState(true);

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
            <input type="text" placeholder="Enter full name" />
          </div>
          <div className="input">
            <input type="number" placeholder="Enter phone number" />
          </div>
          <div className="input">
            <input type="email" placeholder="Enter email address" />
          </div>
          <div className="input">
            <input type={isPassHidden ? "password" : "text"} placeholder="Enter password" />
            <span onClick={() => setIsPassHidden(!isPassHidden)}>{isPassHidden ? <PhEyeClosed /> : <PhEye />}</span>
          </div>
          <div className="input">
            <input type={isPassHidden ? "password" : "text"} placeholder="Confirm password" />
            <span onClick={() => setIsPassHidden(!isPassHidden)}>{isPassHidden ? <PhEyeClosed /> : <PhEye />}</span>
          </div>
          <button className="button">Create Account</button>
        </div>
        <p className="signup">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </section>
  );
}
