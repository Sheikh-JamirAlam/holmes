import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { LogosFacebook, LogosLinkedinIcon, LogosTwitter } from "../components/Icons";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Profile.css";

export default function Profile() {
  const [searchParams] = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [language, setLanguage] = useState("");
  const [bio, setBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = (e) => {
    async function saveUserDetails() {
      try {
        const res = await axios.post(`http://localhost:8080/api/user/updateuser`, {
          userAddress: address,
          userBio: bio,
          userCity: city,
          userContact: contact,
          userEmail: email,
          userLanguage: language,
          userName: name,
        });
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    if (e.target.innerText === "Save profile") {
      saveUserDetails();
    }
    setIsEditing((prev) => !prev);
  };

  useEffect(() => {
    async function getUserDetails() {
      try {
        const res = await axios.get(`http://localhost:8080/api/user/getuser=${searchParams.get("email")}`);
        setName(res.data.userName);
        setEmail(res.data.userEmail);
        setContact(res.data.userContact);
        setAddress(res.data.userAddress === null ? "Enter Address" : res.data.userAddress);
        setCity(res.data.userCity === null ? "Kolkata" : res.data.userCity);
        setLanguage(res.data.userLanguage === null ? "English" : res.data.userLanguage);
        setBio(res.data.userBio === null ? "Enter bio here" : res.data.userBio);
      } catch (err) {
        console.error(err);
      }
    }
    getUserDetails();
  }, [searchParams]);

  return (
    <main>
      <Navbar />
      <div id="heroBG" className="hero-bg search-hero-bg profile-hero-bg"></div>
      <section className="profile-section">
        <div className="profile-bio">
          <div className="profile-container">
            <div className="gradiant"></div>
            <div className="profile-ph">
              <img src="./images/AboutUs/pm.jpg" alt="" />
            </div>
            <div className="bio-container">
              <div>
                <input className="profile-input profile-heading" type="text" value={name} onChange={(e) => setName(e.target.value)} readOnly={!isEditing} />
                <p>{city}</p>
              </div>
              <button className="btn" onClick={handleClick}>
                {!isEditing ? "Edit profile" : "Save profile"}
              </button>
              <div>
                <LogosFacebook /> <LogosLinkedinIcon /> <LogosTwitter />
              </div>
            </div>
          </div>
          <div className="summary-container">
            <input className="profile-input profile-bio" type="text" value={bio} onChange={(e) => setBio(e.target.value)} readOnly={!isEditing} />
          </div>
        </div>
        <div className="details-container">
          <h2>Additional Details</h2>
          <h4>Email</h4>
          <input className="profile-input" type="text" value={email} onChange={(e) => setEmail(e.target.value)} readOnly={!isEditing} />
          <h4>Contact</h4>
          <input className="profile-input" type="text" value={"+91" + contact} onChange={(e) => setContact(e.target.value)} readOnly={!isEditing} />
          <h4>Address</h4>
          <input className="profile-input" type="text" value={address} onChange={(e) => setAddress(e.target.value)} readOnly={!isEditing} />
          <h4>City</h4>
          <input className="profile-input" type="text" value={city} onChange={(e) => setCity(e.target.value)} readOnly={!isEditing} />
          <h4>Language</h4>
          <input className="profile-input" type="text" value={language} onChange={(e) => setLanguage(e.target.value)} readOnly={!isEditing} />
        </div>
      </section>
      <Footer />
    </main>
  );
}
