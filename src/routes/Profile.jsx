import "../styles/Profile.css";
import {
  LogosFacebook,
  LogosLinkedinIcon,
  LogosTwitter,
} from "../components/Icons";

export default function Profile() {
  return (
    <section className="profile-section">
      <div className="profile-bio">
        <div className="profile-container">
          <div className="gradiant"></div>
          <div className="profile-ph">
            <img src="./images/AboutUs/pm.jpg" alt="" />
          </div>
          <div className="bio-container">
            <div>
              <h1>Lorem Ipsum</h1>
              <p>Kolkata</p>
            </div>
            <button className="btn">Edit profile</button>
            <div>
              <LogosFacebook /> <LogosLinkedinIcon /> <LogosTwitter />
            </div>
          </div>
        </div>
        <div className="summary-container">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </div>
      <div className="details-container">
        <h2>Additional Details</h2>
        <h4>EMAIL</h4>
        <p>loream111@gmail.com</p>
        <h4>CONTACT</h4>
        <p>+917000008976</p>
        <h4>ADDRESS</h4>
        <p>107/8,Dum Dum</p>
        <h4>Role</h4>
        <p>User</p>
        <h4>CITY</h4>
        <p>Kolkata</p>
        <h4>LANGUAGE</h4>
        <p>English</p>
      </div>
    </section>
  );
}
