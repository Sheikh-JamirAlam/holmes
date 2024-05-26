import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import OfferItem from "../components/home/OfferItem";
import PopularItem from "../components/home/PopularItem";
import Footer from "../components/Footer";
import SearchOptionItem from "../components/home/SearchOptionItem";
import SearchOptionPrice from "../components/home/SearchOptionPrice";
import { Locations } from "../data/Locations";
import "../styles/Home.css";

export default function Home() {
  const [isLocationOptionsOpen, setIsLocationOptionsOpen] = useState(false);
  const [locationText, setLocationText] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState(
    Locations.filter((loc) => (loc.name === "Kolkata") | (loc.name === "Mumbai") | (loc.name === "Delhi") | (loc.name === "Bangalore") | (loc.name === "Tamil Nadu"))
  );
  const [isTypeOptionsOpen, setIsTypeOptionsOpen] = useState(false);
  const [typeText, setTypeText] = useState("");
  const [isPriceOptionsOpen, setIsPriceOptionsOpen] = useState(false);
  const [priceText, setPriceText] = useState("");
  const [popularImages, setPopularImages] = useState([]);
  const [popularDesc, setPopularDesc] = useState([]);
  const [offerImages, setOfferImages] = useState([]);
  const [offerDesc, setOfferDesc] = useState([]);
  const locationRef = useRef([]);

  const handleSearchTextChange = (e) => {
    setLocationText(e.target.value);
    const suggestions = Locations.filter((element) => {
      return element.name.toLowerCase().startsWith(e.target.value.toLowerCase()) && element;
    });
    setSearchSuggestions(suggestions);
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (!locationRef.current[0]?.contains(e.target)) {
        setIsLocationOptionsOpen(false);
      }
      if (!locationRef.current[1]?.contains(e.target)) {
        setIsTypeOptionsOpen(false);
      }
      if (!locationRef.current[2]?.contains(e.target)) {
        setIsPriceOptionsOpen(false);
      }
    });

    async function getPopularImages() {
      try {
        const descPromises = [2, 8, 13, 21].map(async (rid) => {
          const res = await axios.get(`http://localhost:8080/api/rooms/getroombyid=${rid}`);
          return res.data;
        });
        const descriptions = await Promise.all(descPromises);
        setPopularDesc(descriptions);
        const imagePromises = [2, 8, 13, 21].map(async (room) => {
          const response = await axios.get(`http://localhost:8080/api/images/byroom/${room}`);
          return response.data[0];
        });
        const images = await Promise.all(imagePromises);
        setPopularImages(images);
      } catch (err) {
        console.error(err);
      }
    }
    getPopularImages();

    async function getOfferImages() {
      try {
        const descPromises = [10, 3, 17].map(async (rid) => {
          const res = await axios.get(`http://localhost:8080/api/rooms/getroombyid=${rid}`);
          return res.data;
        });
        const descriptions = await Promise.all(descPromises);
        setOfferDesc(descriptions);
        const imagePromises = [10, 3, 17].map(async (room) => {
          const response = await axios.get(`http://localhost:8080/api/images/byroom/${room}`);
          return response.data[0];
        });
        const images = await Promise.all(imagePromises);
        setOfferImages(images);
      } catch (err) {
        console.error(err);
      }
    }
    getOfferImages();
  }, []);

  return (
    <main>
      {/* Navbar */}
      <Navbar />
      {/* Hero section */}
      <section className="hero-container">
        <div id="heroBG" className="hero-bg"></div>
        <h1 className="hero-text">Discover Your Next Living Space</h1>
        <div className="hero-search-container">
          <div className="hero-search-filter">
            <p>Location</p>
            <div ref={(el) => (locationRef.current[0] = el)}>
              <input value={locationText} type="text" placeholder="Where are you going?" onChange={handleSearchTextChange} onClick={() => setIsLocationOptionsOpen(true)} />
              <div className={`hero-search-options ${!isLocationOptionsOpen && "hidden"}`}>
                <p>Popular nearby destinations</p>
                {searchSuggestions.slice(0, 5).map((element, index) => {
                  return <SearchOptionItem key={index} city={element.name} state="India" setLocationText={setLocationText} setIsLocationOptionsOpen={setIsLocationOptionsOpen} />;
                })}
              </div>
            </div>
          </div>
          <div className="hero-search-filter">
            <p>Type</p>
            <div ref={(el) => (locationRef.current[1] = el)}>
              <input value={typeText} type="text" placeholder="Flat, Paying Guest" onChange={(e) => setTypeText(e.target.value)} onClick={() => setIsTypeOptionsOpen(true)} readOnly />
              <div className={`hero-search-options ${!isTypeOptionsOpen && "hidden"}`}>
                <p>Popular nearby destinations</p>
                <SearchOptionItem setTypeText={setTypeText} setIsTypeOptionsOpen={setIsTypeOptionsOpen} />
              </div>
            </div>
          </div>
          <div className="hero-search-filter">
            <p>Price Range</p>
            <div ref={(el) => (locationRef.current[2] = el)}>
              <input value={priceText} type="text" placeholder="Set your budget" onChange={(e) => setPriceText(e.target.value)} onClick={() => setIsPriceOptionsOpen(true)} readOnly />
              <div className={`hero-search-options ${!isPriceOptionsOpen && "hidden"}`}>
                <p>Popular nearby destinations</p>
                <SearchOptionPrice setPriceText={setPriceText} setIsPriceOptionsOpen={setIsPriceOptionsOpen} />
              </div>
            </div>
          </div>
          <a
            href={`/search?location=${locationText.substring(0, locationText.indexOf(","))}&type=${typeText === "" ? "Flat, Paying Guest" : typeText}&price=${priceText
              .replace(/,/g, "")
              .match(/[0-9]*[0-9]/g)}`}
          >
            <button className="btn">Search</button>
          </a>
        </div>
      </section>
      {/* Popular Section */}
      <section className="popular-container">
        <div>
          <h1 className="popular-header">Popular PG/Flat</h1>
          <p>Browse Our Best PG's/Flat's and Select Your Perfect Room.</p>
        </div>
        <div className="popular-items">
          {popularImages.length === 4 ? (
            <>
              <PopularItem
                background={`data:image/jpeg;base64,${popularImages[0]}`}
                id={popularDesc[0].roomId}
                location={popularDesc[0].roomAddress.slice(0, popularDesc[0].roomAddress.indexOf(","))}
              />
              <PopularItem
                background={`data:image/jpeg;base64,${popularImages[1]}`}
                id={popularDesc[1].roomId}
                location={popularDesc[1].roomAddress.slice(0, popularDesc[1].roomAddress.indexOf(","))}
              />
              <PopularItem
                background={`data:image/jpeg;base64,${popularImages[2]}`}
                id={popularDesc[2].roomId}
                location={popularDesc[2].roomAddress.slice(0, popularDesc[2].roomAddress.indexOf(","))}
              />
              <PopularItem
                background={`data:image/jpeg;base64,${popularImages[3]}`}
                id={popularDesc[3].roomId}
                location={popularDesc[3].roomAddress.slice(0, popularDesc[3].roomAddress.indexOf(","))}
              />
            </>
          ) : (
            <>
              <PopularItem loading={true} />
              <PopularItem loading={true} />
              <PopularItem loading={true} />
              <PopularItem loading={true} />
            </>
          )}
        </div>
      </section>
      {/* Offers Section */}
      <section className="popular-container">
        <div className="offers-text">
          <h1 className="popular-header">Special Offers</h1>
          <p>Avail Exclusive Deals</p>
        </div>
        <div className="offers-items">
          {offerImages.length === 3 ? (
            <>
              <OfferItem
                background={`data:image/jpeg;base64,${offerImages[0]}`}
                id={offerDesc[0].roomId}
                location={offerDesc[0].roomAddress}
                price={offerDesc[0].roomPrice}
                rooms={offerDesc[0].roomRooms}
                bath={offerDesc[0].roomBathroom}
                guests={offerDesc[0].roomGuests}
                rating={offerDesc[0].roomRating}
              />
              <OfferItem
                background={`data:image/jpeg;base64,${offerImages[1]}`}
                id={offerDesc[1].roomId}
                location={offerDesc[1].roomAddress}
                price={offerDesc[1].roomPrice}
                rooms={offerDesc[1].roomRooms}
                bath={offerDesc[1].roomBathroom}
                guests={offerDesc[1].roomGuests}
                rating={offerDesc[1].roomRating}
              />
              <OfferItem
                background={`data:image/jpeg;base64,${offerImages[2]}`}
                id={offerDesc[2].roomId}
                location={offerDesc[2].roomAddress}
                price={offerDesc[2].roomPrice}
                rooms={offerDesc[2].roomRooms}
                bath={offerDesc[2].roomBathroom}
                guests={offerDesc[2].roomGuests}
                rating={offerDesc[2].roomRating}
              />
            </>
          ) : (
            <>
              <OfferItem loading={true} />
              <OfferItem loading={true} />
              <OfferItem loading={true} />
            </>
          )}
        </div>
      </section>
      {/* Video Section */}
      <section className="video-container">
        <div>
          <p>
            Browse our selection of top-rated PGs and flats to find the perfect room that fits your lifestyle. Our carefully curated options offer comfort, convenience, and affordability, ensuring you
            have a seamless living experience. Each property is equipped with essential amenities and is located in prime areas for easy access to everything you need. Start your search today and
            discover your ideal living space with us!
          </p>
          <h3>Wonderful Room Experience</h3>
          <h3>With Balcony, Modern Bathrooms, Room Decorations, and etc(s)</h3>
        </div>
      </section>
      {/* Feature Section */}
      <section className="feature-container">
        <h1>We ensure a seamless experience, matching you with your dream property</h1>
        <div>
          <div>
            <img style={{ transform: "translate(20rem,0)" }} src="/images/Home/feature-1.png" alt="" />
            <img style={{ transform: "translate(21rem,13rem)" }} src="/images/Home/feature-3.png" alt="" />
            <img style={{ transform: "translate(10rem,5rem)", width: "18rem" }} src="/images/Home/feature-2.png" alt="" />
          </div>
          <div className="feature-text">
            <div>
              <h2>Budget Friendly</h2>
              <p>Cost-effective choices for your ideal living situation.</p>
            </div>
            <div>
              <h2>Prime Location</h2>
              <p>Discover Convenience and Comfort in Prime Locations! Easy to access your needs.</p>
            </div>
            <div>
              <h2>Trust Worthy</h2>
              <p>Reliable, Honest, and Dependable: Your Trusted Choice for Quality Service.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </main>
  );
}
