export default function Navbar() {
  return (
    <section className="navbar">
      <div className="logo">Holmes</div>
      <div className="nav-btns">
        <a href="/">
          <p>Home</p>
        </a>
        <p>About</p>
        <p>Location</p>
        <a href="/contact-us">
          <p>Contact</p>
        </a>
      </div>
      <div className="account-btns">
        <a href="/login">
          <button className="btn secondary-btn">Login</button>
        </a>
        <a href="/signup">
          <button className="btn">Sign up</button>
        </a>
      </div>
    </section>
  );
}
