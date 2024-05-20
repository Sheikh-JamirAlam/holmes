import { useEffect, useRef, useState } from "react";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Pagination from "@mui/material/Pagination";
import { NumericFormat } from "react-number-format";
import Navbar from "../components/Navbar";
import SearchItem from "../components/search/SearchItem";
import SortOptionItem from "../components/search/SortOptionItem";
import Footer from "../components/Footer";
import { SearchIcon, UpDown } from "../components/Icons";
import "../styles/Search.css";

export default function Search() {
  const [price, setPrice] = useState([15000, 25000]);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortText, setSortText] = useState("Our top picks");
  const sortRef = useRef();
  const minDistance = 100;
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setPrice([Math.min(newValue[0], price[1] - minDistance), price[1]]);
    } else {
      setPrice([price[0], Math.max(newValue[1], price[0] + minDistance)]);
    }
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (!sortRef.current?.contains(e.target)) {
        setIsSortOpen(false);
      }
    });
  });

  return (
    <main>
      <Navbar />
      <section className="hero-container search-bg">
        <div id="heroBG" className="hero-bg search-hero-bg"></div>
        <div className="search-container">
          <div className="search-bar">
            <SearchIcon />
            <input type="text" placeholder="Enter an address e.g. street, city and state or zip" />
          </div>
          <button className="btn">
            <SearchIcon />
            Search
          </button>
        </div>
      </section>
      <section className="search-main-container">
        <section className="search-filter-container">
          <div className="search-filter-heading">
            <h3>Filters</h3>
            <p>Reset filters</p>
          </div>
          <div>
            <h2>Property type</h2>
            <FormControlLabel control={<Checkbox defaultChecked />} label="House" />
            <FormControlLabel control={<Checkbox />} label="Apartment" />
          </div>
          <div>
            <h2>Price range</h2>
            <div className="numeric">
              <p>
                ₹ <NumericFormat displayType="text" value={price[0]} thousandsGroupStyle="lakh" thousandSeparator="," />
              </p>
              <p>
                ₹ <NumericFormat displayType="text" value={price[1]} thousandsGroupStyle="lakh" thousandSeparator="," />
              </p>
            </div>
            <Slider value={price} onChange={handleChange} step={100} min={5000} max={50000} valueLabelDisplay="auto" disableSwap />
          </div>
          <div>
            <h2>Rooms</h2>
            <FormControlLabel control={<Checkbox defaultChecked />} label="1 rooms" />
            <FormControlLabel control={<Checkbox />} label="2 rooms" />
            <FormControlLabel control={<Checkbox />} label="3 rooms" />
            <FormControlLabel control={<Checkbox />} label="More" />
          </div>
          <div>
            <h2>Bathrooms</h2>
            <FormControlLabel control={<Checkbox defaultChecked />} label="1" />
            <FormControlLabel control={<Checkbox />} label="2" />
            <FormControlLabel control={<Checkbox />} label="More" />
          </div>
          <div>
            <h2>Others</h2>
            <FormControlLabel control={<Checkbox />} label="Pets allowed" />
            <FormControlLabel control={<Checkbox />} label="Furnished" />
            <FormControlLabel control={<Checkbox />} label="Meal Facilities" />
          </div>
        </section>
        <section className="search-result-container">
          <div>
            <h2>Results: 45 Properties found</h2>
            <div ref={sortRef} className="search-sort-container">
              <button onClick={() => setIsSortOpen(true)}>
                {`Sort by: ${sortText}`}
                <UpDown />
              </button>
              <div className={`sort-options ${!isSortOpen && "hidden"}`}>
                <SortOptionItem option="Our top picks" setSortText={setSortText} setIsSortOpen={setIsSortOpen} />
                <SortOptionItem option="Price (Low to High)" setSortText={setSortText} setIsSortOpen={setIsSortOpen} />
                <SortOptionItem option="Price (High to Low)" setSortText={setSortText} setIsSortOpen={setIsSortOpen} />
                <SortOptionItem option="Rating (High to Low)" setSortText={setSortText} setIsSortOpen={setIsSortOpen} />
                <SortOptionItem option="Rating (Low to High)" setSortText={setSortText} setIsSortOpen={setIsSortOpen} />
                <SortOptionItem option="Highest reviews" setSortText={setSortText} setIsSortOpen={setIsSortOpen} />
              </div>
            </div>
          </div>
          {Array.from({ length: 12 }, (_, index) => (
            <SearchItem key={index} price="$1,650" location="Rajarhat, Kolkata" rating="8.5" type="House" bedroom="2 Beds" area="98" />
          ))}
          <div>
            <Pagination count={10} color="primary" />
          </div>
        </section>
      </section>
      <Footer />
    </main>
  );
}
