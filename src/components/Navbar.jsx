export default function Navbar() {
  return (
    <section className="navbar">
      <div className="logo">Holmes</div>
      <div className="nav-btns">
        <p>Home</p>
        <p>About</p>
        <p>Location</p>
        <p>Contact</p>
        <div className="account-btns">
          <a href="/signup">
            <button className="btn">Signup</button>
          </a>
          <a href="/login">
            <button className="btn">Login</button>
          </a>
        </div>
      </div>
    </section>
  );
}
