import "../styles/Admin.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { CrossInCircle, PhEye, PhEyeClosed } from "../components/Icons";
export default function AdminLogin() {
  const navigate = useNavigate();
  const [isPassHidden, setIsPassHidden] = useState(true);
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    if (Cookies.get("adminauth")) {
      navigate("/admin/dashboard");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleLogin(e) {
    try {
      const getRes = await axios.post("http://localhost:8080/api/admin/login", {
        adminUsername: name,
        adminPass: pass,
      });
      if (getRes.data === "Login successful") {
        Cookies.set("adminauth", name, { expires: 7 });
        navigate("/admin/dashboard");
      } else {
        navigate("/admin-login");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section>
      <div className="admin-container">
        <a className="close-cross" href="/">
          <CrossInCircle />
        </a>
        <h1 className="heading">Admin Login</h1>
        <div className="input-container">
          <div className="input">
            <input type="text" placeholder="Enter username" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="input">
            <input type={isPassHidden ? "password" : "text"} placeholder="Enter password" value={pass} onChange={(e) => setPass(e.target.value)} />
            <span onClick={() => setIsPassHidden(!isPassHidden)}>{isPassHidden ? <PhEyeClosed /> : <PhEye />}</span>
          </div>
          <button className="button" onClick={handleLogin}>
            Sign in
          </button>
        </div>
      </div>
    </section>
  );
}
