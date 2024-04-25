import { LogosFacebook, LogosLinkedinIcon, LogosTwitter } from "./Icons.jsx";

export default function Footer() {
  return (
    <section className="footer">
      <div className="social">
        <h3>Homes</h3>
        <div>
          <LogosFacebook />
          <LogosLinkedinIcon />
          <LogosTwitter />
        </div>
        <div>
          <p>Privacy Policy</p>
          <p>Terms & Condition</p>
        </div>
      </div>
      <div className="links">
        <div>
          <h3>Information</h3>
          <p>Home</p>
          <p>Search</p>
          <p>Travel</p>
        </div>
        <div>
          <h3>Helpful Links</h3>
          <p>Support</p>
          <p>FAQ</p>
        </div>
        <div>
          <h3>Contact</h3>
          <p>+91 1234567891</p>
          <p>hello@gmail.com</p>
        </div>
      </div>
    </section>
  );
}
