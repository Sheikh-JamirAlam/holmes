import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Pagination from "@mui/material/Pagination";
import { NumericFormat } from "react-number-format";
import Navbar from "../components/Navbar";
import SearchItem from "../components/search/SearchItem";
import SortOptionItem from "../components/search/SortOptionItem";
import Footer from "../components/Footer";
import { Loading, SearchIcon, UpDown } from "../components/Icons";
import "../styles/Search.css";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchLocation, setSearchLocation] = useState(searchParams.get("location"));
  const [price, setPrice] = useState([15000, 25000]);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortText, setSortText] = useState("Our top picks");
  const [roomSearchResult, setRoomSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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

  const handlePropertyTypeChange = (event) => {
    const isFlatChecked = document.querySelectorAll(".property-type-checkbox>input")[0].checked;
    const isPGChecked = document.querySelectorAll(".property-type-checkbox>input")[1].checked;
    if (isFlatChecked && isPGChecked) {
      setSearchParams({
        location: searchParams.get("location"),
        type: "Flat, Paying Guest",
        price: searchParams.get("price"),
      });
    } else if (isFlatChecked && !isPGChecked) {
      setSearchParams({
        location: searchParams.get("location"),
        type: "Flat",
        price: searchParams.get("price"),
      });
    } else if (!isFlatChecked && isPGChecked) {
      setSearchParams({
        location: searchParams.get("location"),
        type: "Paying Guest",
        price: searchParams.get("price"),
      });
    } else {
      setSearchParams({
        location: searchParams.get("location"),
        type: "",
        price: searchParams.get("price"),
      });
    }
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (!sortRef.current?.contains(e.target)) {
        setIsSortOpen(false);
      }
    });
  });

  useEffect(() => {
    async function searchRooms() {
      try {
        setIsLoading(true);
        const res = await axios.get(`http://localhost:8080/api/search?location=${searchParams.get("location")}&type=${searchParams.get("type")}&price=${searchParams.get("price")}`);
        setIsLoading(false);
        setRoomSearchResult(res.data);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    searchRooms();
  }, [searchParams]);

  return (
    <main>
      <Navbar />
      <section className="hero-container search-bg">
        <div id="heroBG" className="hero-bg search-hero-bg"></div>
        <div className="search-container">
          <div className="search-bar">
            <SearchIcon />
            <input value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} type="text" placeholder="Enter an address e.g. street, city and state or zip" />
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
            <FormControlLabel
              control={
                <Checkbox
                  className="property-type-checkbox"
                  checked={(searchParams.get("type") === "Flat" || searchParams.get("type") === "Flat, Paying Guest") && true}
                  onChange={handlePropertyTypeChange}
                />
              }
              label="Flat"
            />
            <FormControlLabel
              control={
                <Checkbox
                  className="property-type-checkbox"
                  checked={(searchParams.get("type") === "Paying Guest" || searchParams.get("type") === "Flat, Paying Guest") && true}
                  onChange={handlePropertyTypeChange}
                />
              }
              label="Paying Guest"
            />
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
            <h2>Results: {roomSearchResult?.length} Properties found</h2>
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
          {isLoading ? (
            <Loading className="loading-svg" />
          ) : roomSearchResult?.length > 0 ? (
            roomSearchResult?.map((room, index) => {
              return (
                <SearchItem
                  key={index}
                  rid={room.roomId}
                  price={room.roomPrice}
                  location={room.roomAddress}
                  rating={room.roomRating}
                  type={room.roomType === 1 ? "Flat" : "Paying Guest"}
                  bedroom={`${room.roomRooms} Bed${room.roomRooms > 1 ? "s" : ""}`}
                  guests={`${room.roomGuests} Guest${room.roomGuests > 1 ? "s" : ""}`}
                />
              );
            })
          ) : (
            <h1 className="no-properties">No properties found</h1>
          )}
          <div>
            <Pagination count={10} color="primary" />
          </div>
        </section>
      </section>
      <Footer />
    </main>
  );
}
