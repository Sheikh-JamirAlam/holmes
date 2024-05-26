import { LogosFacebook, LogosLinkedinIcon, LogosTwitter } from "./Icons.jsx";

export default function Footer() {
  return (
    <section className="footer">
      <div className="social">
        <h3>Holmes</h3>
        <div>
          <LogosFacebook />
          <LogosLinkedinIcon />
          <LogosTwitter />
        </div>
        <div>
          <a href="/privacy">
            <p>Privacy Policy</p>
          </a>
          <a href="/terms">
            <p>Terms & Condition</p>
          </a>
        </div>
      </div>
      <div className="links">
        <div>
          <h3>Information</h3>
          <a href="/">
            <p>Home</p>
          </a>
          <a href="/about-us">
            <p>About Us</p>
          </a>
        </div>
        <div>
          <h3>Helpful Links</h3>
          <a href="/faq">
            <p>FAQ</p>
          </a>
          <a href="/contact">
            <p>Contact Us</p>
          </a>
        </div>
        <div>
          <h3>Contact</h3>
          <p>+91 1234567891</p>
          <p>support.holmes@gmail.com</p>
        </div>
      </div>
    </section>
  );
}
