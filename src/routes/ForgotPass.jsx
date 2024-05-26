import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { CrossInCircle } from "../components/Icons";
import "../styles/Login.css";

export default function ForgotPass() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [stage, setStage] = useState("email");

  useEffect(() => {
    if (Cookies.get("auth")) {
      navigate("/");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleClick() {
    try {
      const res = await axios.post("http://localhost:8081/api/otp/request-otp", null, { params: { email } });
      if (res.data === "OTP sent to email!") {
        setStage("otp");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleConfirmOTP() {
    try {
      const res = await axios.post("http://localhost:8081/api/otp/verify-otp", null, { params: { email, otp } });
      if (res.data === "OTP verified successfully!") {
        setStage("password");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section>
      <div className="login-container">
        <a className="close-cross" href="/">
          <CrossInCircle />
        </a>
        <h1 className="heading">Forgot Password</h1>
        {stage === "email" && (
          <>
            <p>Enter your email to receive the OTP</p>
            <div className="input-container">
              <div className="input">
                <input type="email" placeholder="Enter email address" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <button className="button" onClick={handleClick}>
                Send OTP
              </button>
            </div>
          </>
        )}
        {stage === "otp" && (
          <>
            <p>Enter the OTP you just received</p>
            <div className="input-container">
              <div className="input">
                <input type="number" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
              </div>
              <button className="button" onClick={handleConfirmOTP}>
                Confirm
              </button>
            </div>
          </>
        )}
        {stage === "password" && (
          <>
            <p>Enter the OTP you just received</p>
            <div className="input-container">
              <div className="input">
                <input type="number" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
              </div>
              <button className="button" onClick={handleClick}>
                Confirm
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
