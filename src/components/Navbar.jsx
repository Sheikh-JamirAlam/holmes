export default function Navbar() {
  return (
    <section className="navbar">
      <div className="logo">Holmes</div>
      <div className="nav-btns">
        <p>Home</p>
        <p>About</p>
        <p>Location</p>
        <a href="/contact-us">
          <p>Contact</p>
        </a>
      </div>
      <div className="account-btns">
        <a href="/login">
          <p>Login</p>
        </a>
        <a href="/signup">
          <button className="btn">Sign up</button>
        </a>
      </div>
    </section>
  );
}
