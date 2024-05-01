import { useState } from "react";
import Navbar from "../components/Navbar";
import OfferItem from "../components/OfferItem";
import PopularItem from "../components/PopularItem";
import Footer from "../components/Footer";
import "../styles/Home.css";
import { Location } from "../components/Icons";

export default function Home() {
  const [isLocationOptionsOpen, setIsLocationOptionsOpen] = useState(false);
  const [locationText, setLocationText] = useState("");

  return (
    <main>
      {/* Navbar */}
      <Navbar />
      {/* Hero section */}
      <section className="hero-container">
        <div className="hero-bg"></div>
        <h1 className="hero-text">Let's Get Your PG</h1>
        <div className="hero-search-container">
          <div className="hero-search-filter">
            <p>Location</p>
            <input
              value={locationText}
              type="text"
              placeholder="Where are you going?"
              onChange={(e) => setLocationText(e.target.value)}
              onFocus={() => setIsLocationOptionsOpen(true)}
              onBlur={() => setIsLocationOptionsOpen(false)}
            />
            {isLocationOptionsOpen && (
              <div className={`hero-search-options`}>
                <p>Popular nearby destinations</p>
                <div onClick={(e) => console.log("t")}>
                  <Location />
                  <div>
                    <h2>Kolkata</h2>
                    <p>India</p>
                  </div>
                </div>
                <div>
                  <Location />
                  <div>
                    <h2>Delhi</h2>
                    <p>India</p>
                  </div>
                </div>
                <div>
                  <Location />
                  <div>
                    <h2>Mumbai</h2>
                    <p>India</p>
                  </div>
                </div>
                <div>
                  <Location />
                  <div>
                    <h2>Bengaluru</h2>
                    <p>India</p>
                  </div>
                </div>
                <div>
                  <Location />
                  <div>
                    <h2>Kerala</h2>
                    <p>India</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="hero-search-filter">
            <p>Type</p>
            <input className="test" type="text" placeholder="Flat" />
          </div>
          <div className="hero-search-filter">
            <p>Price Range</p>
            <input type="text" placeholder="Upto ₹10,000" />
          </div>
          <button className="btn">Search</button>
        </div>
      </section>
      {/* Popular Section */}
      <section className="popular-container">
        <div>
          <h1 className="popular-header">Popular PG's</h1>
          <p>Checkouts ours best PG&apos;s and find your best room that suits you.</p>
        </div>
        <div className="popular-items">
          <PopularItem background="./images/popular-1.png" />
          <PopularItem background="./images/popular-2.png" />
          <PopularItem background="./images/popular-3.png" />
          <PopularItem background="./images/popular-4.png" />
        </div>
      </section>
      {/* Offers Section */}
      <section className="popular-container">
        <div className="offers-text">
          <h1 className="popular-header">Special Offers</h1>
          <p>Get best offers</p>
        </div>
        <div className="offers-items">
          <OfferItem background="./images/offer-1.png" />
          <OfferItem background="./images/offer-2.png" />
          <OfferItem background="./images/offer-3.png" />
        </div>
      </section>
      {/* Video Section */}
      <section className="video-container">
        <div>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
            galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          </p>
          <h3>Wonderful Room Experience</h3>
          <h3>Balcony Room Tour</h3>
        </div>
      </section>
      {/* Feature Section */}
      <section className="feature-container">
        <h1>We Provides Latest Properties For Our Valuable Clients</h1>
        <div>
          <div>
            <img style={{ transform: "translate(20rem,0)" }} src="/images/feature-1.png" alt="" />
            <img style={{ transform: "translate(21rem,13rem)" }} src="/images/feature-3.png" alt="" />
            <img style={{ transform: "translate(10rem,5rem)", width: "18rem" }} src="/images/feature-2.png" alt="" />
          </div>
          <div className="feature-text">
            <div>
              <h2>Budget Friendly</h2>
              <p>We will find you the best PG according to your budget</p>
            </div>
            <div>
              <h2>Prime Location</h2>
              <p>We will find you the best PG according to your budget</p>
            </div>
            <div>
              <h2>Trust Worthy</h2>
              <p>We will find you the best PG according to your budget</p>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </main>
  );
}
