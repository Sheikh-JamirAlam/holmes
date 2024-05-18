import "../styles/Admin.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { CrossInCircle, PhEye, PhEyeClosed } from "../components/Icons";
export default function Admin() {
  const navigate = useNavigate();
  const [isPassHidden, setIsPassHidden] = useState(true);
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  async function handleLogin(e) {
    try {
      const getRes = await axios.post("http://localhost:8080/api/admin/login", {
        adminName: name,
        adminPass: pass,
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
      <div className="admin-container">
        <a className="close-cross" href="/">
          <CrossInCircle />
        </a>
        <h1 className="heading">Admin Login</h1>
        <div className="input-container">
          <div className="input">
            <input
              type="text"
              placeholder="Enter username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input">
            <input
              type={isPassHidden ? "password" : "text"}
              placeholder="Enter password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <span onClick={() => setIsPassHidden(!isPassHidden)}>
              {isPassHidden ? <PhEyeClosed /> : <PhEye />}
            </span>
          </div>
          <button className="button" onClick={handleLogin}>
            Sign in
          </button>
        </div>
      </div>
    </section>
  );
}
