import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { NumericFormat } from "react-number-format";
import Navbar from "../components/Navbar";
import SearchItem from "../components/search/SearchItem";
import SearchTextItem from "../components/search/SearchTextItem";
import Footer from "../components/Footer";
import { Loading, SearchIcon } from "../components/Icons";
import { Locations } from "../data/Locations";
import "../styles/Search.css";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [images, setImages] = useState([]);
  const [searchLocation, setSearchLocation] = useState(searchParams.get("location"));
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [price, setPrice] = useState([
    parseInt(searchParams.get("price").substring(0, searchParams.get("price").indexOf(","))),
    parseInt(searchParams.get("price").substring(searchParams.get("price").indexOf(",") + 1)),
  ]);
  const [roomSearchResult, setRoomSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const searchRef = useRef();
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

  const handlePropertyPriceChange = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("price", `${price[0]},${price[1]}`);
    setSearchParams(newParams);
  };

  const handlePropertyTypeChange = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    const isFlatChecked = document.querySelectorAll(".property-type-checkbox>input")[0].checked;
    const isPGChecked = document.querySelectorAll(".property-type-checkbox>input")[1].checked;
    if (isFlatChecked && isPGChecked) {
      newParams.set("type", "Flat, Paying Guest");
    } else if (isFlatChecked && !isPGChecked) {
      newParams.set("type", "Flat");
    } else if (!isFlatChecked && isPGChecked) {
      newParams.set("type", "Paying Guest");
    } else {
      newParams.set("type", "");
    }
    setSearchParams(newParams);
  };

  const handlePropertyRoomChange = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    const isOneChecked = document.querySelectorAll(".property-rooms-checkbox>input")[0].checked;
    const isTwoChecked = document.querySelectorAll(".property-rooms-checkbox>input")[1].checked;
    const isMoreChecked = document.querySelectorAll(".property-rooms-checkbox>input")[2].checked;
    if (!isOneChecked && !isTwoChecked && !isMoreChecked) {
      newParams.delete("rooms");
    } else {
      if (searchParams.get("rooms") === null) newParams.append("rooms", `${isOneChecked ? "1" : ""}${isTwoChecked ? "2" : ""}${isMoreChecked ? "More" : ""}`);
      else newParams.set("rooms", `${isOneChecked ? "1" : ""}${isTwoChecked ? "2" : ""}${isMoreChecked ? "More" : ""}`);
    }
    setSearchParams(newParams);
  };

  const handlePropertyBathroomChange = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    const isOneChecked = document.querySelectorAll(".property-bathroom-checkbox>input")[0].checked;
    const isTwoChecked = document.querySelectorAll(".property-bathroom-checkbox>input")[1].checked;
    const isMoreChecked = document.querySelectorAll(".property-bathroom-checkbox>input")[2].checked;
    if (!isOneChecked && !isTwoChecked && !isMoreChecked) {
      newParams.delete("bathroom");
    } else {
      if (searchParams.get("bathroom") === null) newParams.append("bathroom", `${isOneChecked ? "1" : ""}${isTwoChecked ? "2" : ""}${isMoreChecked ? "More" : ""}`);
      else newParams.set("bathroom", `${isOneChecked ? "1" : ""}${isTwoChecked ? "2" : ""}${isMoreChecked ? "More" : ""}`);
    }
    setSearchParams(newParams);
  };

  const handlePropertyFilterChange = (e) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (searchParams.get(e.target.id) === "true") newParams.delete(e.target.id);
    else if (searchParams.get(e.target.id) === null) newParams.append(e.target.id, true);
    setSearchParams(newParams);
  };

  const handleSearchClick = (e) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("location", searchLocation);
    setSearchParams(newParams);
  };

  const handleSearchTextChange = (e) => {
    setSearchLocation(e.target.value);
    const suggestions = Locations.filter((element) => {
      return element.name.toLowerCase().startsWith(e.target.value.toLowerCase()) && element;
    });
    setSearchSuggestions(suggestions);
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (!searchRef.current?.contains(e.target)) {
        setIsSearchOpen(false);
      }
    });
  }, []);

  useEffect(() => {
    async function searchRooms() {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `http://localhost:8080/api/search?location=${searchParams.get("location")}&type=${searchParams.get("type")}&price=${searchParams.get("price")}${
            searchParams.get("rooms") ? "&rooms=" + searchParams.get("rooms") : ""
          }${searchParams.get("bathroom") ? "&bathroom=" + searchParams.get("bathroom") : ""}${searchParams.get("kitchen") ? "&kitchen=true" : ""}${searchParams.get("ac") ? "&ac=true" : ""}${
            searchParams.get("pvtbath") ? "&pvtbath=true" : ""
          }${searchParams.get("wifi") ? "&wifi=true" : ""}${searchParams.get("furnished") ? "&furnished=true" : ""}${searchParams.get("geyser") ? "&geyser=true" : ""}${
            searchParams.get("fridge") ? "&fridge=true" : ""
          }${searchParams.get("parking") ? "&parking=true" : ""}
          `
        );
        setRoomSearchResult(res.data);
        const response = await axios.get(`http://localhost:8080/api/images/getfirstofroom`);
        setImages(response.data);
        setIsLoading(false);
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
          <div ref={searchRef} className="search-bar">
            <SearchIcon />
            <input value={searchLocation} onChange={handleSearchTextChange} onFocus={() => setIsSearchOpen(true)} type="text" placeholder="Enter an address e.g. street, city and state or zip" />
          </div>
          <div className={`search-recommendation ${!isSearchOpen && "hidden"}`}>
            {searchSuggestions.slice(0, 5).map((element, index) => {
              return <SearchTextItem key={index} option={element.name} setSearchLocation={setSearchLocation} setIsSearchOpen={setIsSearchOpen} />;
            })}
          </div>
          <button className="btn" onClick={handleSearchClick}>
            <SearchIcon />
            Search
          </button>
        </div>
      </section>
      <section className="search-main-container">
        <section className="search-filter-container">
          <div className="search-filter-heading">
            <h3>Filters</h3>
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
            <Slider value={price} onChange={handleChange} step={100} min={1000} max={25000} valueLabelDisplay="auto" disableSwap />
            <button className="btn" onClick={handlePropertyPriceChange}>
              Apply
            </button>
          </div>
          <div>
            <h2>Rooms</h2>
            <FormControlLabel control={<Checkbox className="property-rooms-checkbox" checked={searchParams.get("rooms")?.includes("1")} onChange={handlePropertyRoomChange} />} label="1 rooms" />
            <FormControlLabel control={<Checkbox className="property-rooms-checkbox" checked={searchParams.get("rooms")?.includes("2")} onChange={handlePropertyRoomChange} />} label="2 rooms" />
            <FormControlLabel control={<Checkbox className="property-rooms-checkbox" checked={searchParams.get("rooms")?.includes("More")} onChange={handlePropertyRoomChange} />} label="More" />
          </div>
          <div>
            <h2>Bathrooms</h2>
            <FormControlLabel control={<Checkbox className="property-bathroom-checkbox" checked={searchParams.get("bathroom")?.includes("1")} onChange={handlePropertyBathroomChange} />} label="1" />
            <FormControlLabel control={<Checkbox className="property-bathroom-checkbox" checked={searchParams.get("bathroom")?.includes("2")} onChange={handlePropertyBathroomChange} />} label="2" />
            <FormControlLabel
              control={<Checkbox className="property-bathroom-checkbox" checked={searchParams.get("bathroom")?.includes("More")} onChange={handlePropertyBathroomChange} />}
              label="More"
            />
          </div>
          <div>
            <h2>Others</h2>
            <FormControlLabel control={<Checkbox id="ac" checked={searchParams.get("ac") === "true"} onChange={handlePropertyFilterChange} />} label="Air Conditioning" />
            <FormControlLabel control={<Checkbox id="pvtbath" checked={searchParams.get("pvtbath") === "true"} onChange={handlePropertyFilterChange} />} label="Private Bathroom" />
            <FormControlLabel control={<Checkbox id="wifi" checked={searchParams.get("wifi") === "true"} onChange={handlePropertyFilterChange} />} label="Wifi Available" />
            <FormControlLabel control={<Checkbox id="furnished" checked={searchParams.get("furnished") === "true"} onChange={handlePropertyFilterChange} />} label="Furnished" />
            <FormControlLabel control={<Checkbox id="kitchen" checked={searchParams.get("kitchen") === "true"} onChange={handlePropertyFilterChange} />} label="Kitchen" />
            <FormControlLabel control={<Checkbox id="geyser" checked={searchParams.get("geyser") === "true"} onChange={handlePropertyFilterChange} />} label="Geyser Installed" />
            <FormControlLabel control={<Checkbox id="fridge" checked={searchParams.get("fridge") === "true"} onChange={handlePropertyFilterChange} />} label="Fridge Available" />
            <FormControlLabel control={<Checkbox id="parking" checked={searchParams.get("parking") === "true"} onChange={handlePropertyFilterChange} />} label="Parking Enabled" />
          </div>
        </section>
        <section className="search-result-container">
          <div>
            <h2>Results: {roomSearchResult?.length} Properties found</h2>
          </div>
          {isLoading ? (
            <Loading className="loading-svg" />
          ) : roomSearchResult?.length > 0 ? (
            roomSearchResult?.map((room, index) => {
              return (
                <SearchItem
                  key={index}
                  image={images[index]?.iImage}
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
        </section>
      </section>
      <Footer />
    </main>
  );
}
