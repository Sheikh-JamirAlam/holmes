import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { CrossInCircle, PhEye, PhEyeClosed } from "../components/Icons";
import "../styles/Login.css";

export default function ForgotPass() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isPassHidden, setIsPassHidden] = useState(true);
  const [isPassError, setIsPassError] = useState(false);
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const [stage, setStage] = useState("email");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (Cookies.get("auth")) {
      navigate("/");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClose = () => {
    setOpen(false);
  };

  async function handleClick() {
    try {
      const res = await axios.post("http://localhost:8080/api/otp/request-otp", null, { params: { email } });
      if (res.data === "OTP sent to email!") {
        setStage("otp");
        setOpen(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleConfirmOTP() {
    try {
      const res = await axios.post("http://localhost:8080/api/otp/verify-otp", null, { params: { email, otp } });
      if (res.data === "OTP verified successfully!") {
        setStage("password");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handlePassChange() {
    if (cpass !== pass) {
      setIsPassError(true);
    } else {
      try {
        const res = await axios.post("http://localhost:8080/api/user/updatepass", {
          userEmail: email,
          userPass: pass,
        });
        if (res.data === "Update successful") {
          setOpen(true);
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      } catch (error) {
        console.error(error);
      }
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
            <p>OTP verified! Enter new Password</p>
            <div className="input-container">
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
              <button className="button" onClick={handlePassChange}>
                Confirm
              </button>
            </div>
          </>
        )}
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: "100%" }}>
            {stage === "otp" ? "Email has been sent!" : ""}
            {stage === "password" ? "Successfully Updated Password" : ""}
          </Alert>
        </Snackbar>
      </div>
    </section>
  );
}
