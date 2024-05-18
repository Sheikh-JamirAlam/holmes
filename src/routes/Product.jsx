import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Navbar from "../components/Navbar";
import { AcUnit, AddCircle, Star, SubtractCircle, Wifi } from "../components/Icons";
import "../styles/Product.css";
import ReviewItem from "../components/product/ReviewItem";
import Footer from "../components/Footer";

export default function Product() {
  const [guestNumber, setGuestNumber] = useState(1);

  return (
    <main>
      <Navbar />
      <section className="product-nav-section">
        <div className="hero-bg search-hero-bg"></div>
      </section>
      <section className="product-hero-section">
        <h1>Rustic single room (only) in urban forest bungalow</h1>
        <div className="product-hero-img">
          <div className="product-main-img" style={{ backgroundImage: "url('https://a0.muscache.com/im/pictures/7fa55ecc-3c87-4347-a0d0-6c8485a0b632.jpg?im_w=1200')" }}></div>
          <div className="product-other-img">
            <div style={{ backgroundImage: "url('https://a0.muscache.com/im/pictures/7fa55ecc-3c87-4347-a0d0-6c8485a0b632.jpg?im_w=1200')" }}></div>
            <div style={{ backgroundImage: "url('https://a0.muscache.com/im/pictures/7fa55ecc-3c87-4347-a0d0-6c8485a0b632.jpg?im_w=1200')" }}></div>
          </div>
          <div className="product-other-img">
            <div style={{ backgroundImage: "url('https://a0.muscache.com/im/pictures/7fa55ecc-3c87-4347-a0d0-6c8485a0b632.jpg?im_w=1200')" }}></div>
            <div style={{ backgroundImage: "url('https://a0.muscache.com/im/pictures/7fa55ecc-3c87-4347-a0d0-6c8485a0b632.jpg?im_w=1200')" }}></div>
          </div>
        </div>
      </section>
      <section className="product-details-section">
        <section className="product-details-container">
          <div className="product-heading">
            <div>
              <h2>Room in Mumbai, India</h2>
              <p>1 single bed. Private attached bathroom</p>
            </div>
            <div className="product-heading-rating">
              <Star />
              <p>4.9</p>
            </div>
          </div>
          <div className="product-owner-details">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <div>
              <h3>Remy Sharp</h3>
              <p>4.96 Rating</p>
            </div>
          </div>
          <div className="product-feature">
            <h3>What this place offers</h3>
            <div>
              <div>
                <AcUnit />
                <p>AC unit</p>
              </div>
              <div>
                <Wifi />
                <p>Wifi enabled</p>
              </div>
              <div>
                <AcUnit />
                <p>AC unit</p>
              </div>
              <div>
                <Wifi />
                <p>Wifi enabled</p>
              </div>
              <div>
                <AcUnit />
                <p>AC unit</p>
              </div>
              <div>
                <Wifi />
                <p>Wifi enabled</p>
              </div>
            </div>
          </div>
          <div className="product-about">
            <h3>About this place</h3>
            <p>
              Cozy room, fully stocked in a bungalow with garden view. Ideal ONLY for single travelers seeking safe and comfortable short/long-term stay. Green view, well designed, warm yet bright
              space, includes attached bath, basic pantry, clean linen, A/C, high-speed WiFi. Key to your room & the main door provided for convenience. All essentials in close proximity. You have it
              all in this cute little place. Parties/Decorations/Shoots not allowed. Advanced notice required for extra visitors/vehicle parking.
            </p>
          </div>
        </section>
        <section className="product-reserve-container">
          <div className="reserve">
            <h3>
              ₹8,000 <span>monthly</span>
            </h3>
            <div>
              <p>
                {guestNumber} Guest{guestNumber > 1 && "s"}
              </p>
              <div>
                <SubtractCircle onClick={() => setGuestNumber((prev) => prev - 1)} />
                <AddCircle onClick={() => setGuestNumber((prev) => prev + 1)} />
              </div>
            </div>
            <button className="btn">Reserve</button>
          </div>
        </section>
      </section>
      <section className="product-review-section">
        <h1>Guest reviews</h1>
        <div>
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
        </div>
      </section>
      <Footer />
    </main>
  );
}
