import Navbar from "../components/Navbar";
import { SearchIcon } from "../components/Icons";
import "../styles/Search.css";

export default function Search() {
  return (
    <main>
      <Navbar />
      <section className="hero-container search-bg">
        <div className="hero-bg"></div>
        <div className="search-container">
          <div className="search-bar">
            <SearchIcon />
            <input type="text" />
          </div>
        </div>
      </section>
    </main>
  );
}
