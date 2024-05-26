import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Backdrop } from "@mui/material";
import axios from "axios";
import { NumericFormat } from "react-number-format";
import Navbar from "../components/Navbar";
import { AddCircle, Loading, Star, SubtractCircle } from "../components/Icons";
import "../styles/Product.css";
import ReviewItem from "../components/product/ReviewItem";
import Footer from "../components/Footer";
import Facilities from "../components/product/Facilities";

export default function Product() {
  const { rid } = useParams();
  const navigate = useNavigate();
  const [imageOpen, setImageOpen] = useState([false, ""]);
  const [guestNumber, setGuestNumber] = useState(1);
  const [room, setRoom] = useState(null);
  const [owner, setOwner] = useState(null);
  const [images, setImages] = useState([]);

  const handleReserve = () => {
    navigate(`/payment?rid=${rid}&amount=${room?.roomPrice}`);
  };

  useEffect(() => {
    async function getRoomInfo() {
      try {
        const res = await axios.get(`http://localhost:8080/api/rooms/getroombyid=${rid}`);
        if (res.data.roomOwner) {
          setRoom(res.data);
          console.log(res.data);
          const ownerDataRes = await axios.get(`http://localhost:8080/api/owners/getownerbyid=${res.data.roomOwner}`);
          setOwner(ownerDataRes.data);
        }
        const response = await axios.get(`http://localhost:8080/api/images/byroom/${rid}`);
        setImages(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    getRoomInfo();
  }, [rid]);

  return (
    <main>
      <Navbar />
      <section className="product-nav-section">
        <div id="heroBG" className="hero-bg search-hero-bg"></div>
      </section>
      <section className="product-hero-section">
        <h1>{room?.roomName}</h1>
        <div className="product-hero-img">
          {images.length === 5 ? (
            <div onClick={() => setImageOpen([true, `data:image/jpeg;base64,${images[0]}`])} className="product-main-img" style={{ backgroundImage: `url(data:image/jpeg;base64,${images[0]})` }}></div>
          ) : (
            <div className="popular-loading-svg-container product-loading-main">
              <Loading className="loading-svg" />
            </div>
          )}
          <Backdrop className="product-backdrop" sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={imageOpen[0]} onClick={() => setImageOpen((prev) => prev.with(0, false))}>
            <img className="product-zoomed-img" src={imageOpen[1]} alt="room" />
          </Backdrop>
          <div className="product-other-img">
            {images.length === 5 ? (
              <div onClick={() => setImageOpen([true, `data:image/jpeg;base64,${images[1]}`])} style={{ backgroundImage: `url(data:image/jpeg;base64,${images[1]})` }}></div>
            ) : (
              <div className="popular-loading-svg-container product-loading">
                <Loading className="loading-svg" />
              </div>
            )}
            {images.length === 5 ? (
              <div onClick={() => setImageOpen([true, `data:image/jpeg;base64,${images[2]}`])} style={{ backgroundImage: `url(data:image/jpeg;base64,${images[2]})` }}></div>
            ) : (
              <div className="popular-loading-svg-container product-loading">
                <Loading className="loading-svg" />
              </div>
            )}
          </div>
          <div className="product-other-img">
            {images.length === 5 ? (
              <div onClick={() => setImageOpen([true, `data:image/jpeg;base64,${images[3]}`])} style={{ backgroundImage: `url(data:image/jpeg;base64,${images[3]})` }}></div>
            ) : (
              <div className="popular-loading-svg-container product-loading">
                <Loading className="loading-svg" />
              </div>
            )}
            {images.length === 5 ? (
              <div onClick={() => setImageOpen([true, `data:image/jpeg;base64,${images[4]}`])} style={{ backgroundImage: `url(data:image/jpeg;base64,${images[4]})` }}></div>
            ) : (
              <div className="popular-loading-svg-container product-loading">
                <Loading className="loading-svg" />
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="product-details-section">
        <section className="product-details-container">
          <div className="product-heading">
            <div>
              <h2>Room in {room?.roomAddress}</h2>
              <p>
                {room?.roomRooms} Bedroom{room?.roomRooms > 1 && "s"}. {room?.roomBathroom} Bathroom{room?.roomBathroom > 1 && "s"}.
              </p>
            </div>
            <div className="product-heading-rating">
              <Star />
              <p>
                <NumericFormat displayType="text" value={room?.roomRating} decimalScale={1} fixedDecimalScale />
              </p>
            </div>
          </div>
          <div className="product-owner-details">
            <Avatar alt={owner?.ownerName} src="/static/images/avatar/1.jpg" />
            <div>
              <h3>{owner?.ownerName}</h3>
              <p>
                <NumericFormat displayType="text" value={owner?.ownerRating} decimalScale={2} fixedDecimalScale /> Rating
              </p>
            </div>
          </div>
          <Facilities rid={rid} />
          <div className="product-about">
            <h3>About this place</h3>
            <p>{room?.roomDescription}</p>
          </div>
        </section>
        <section className="product-reserve-container">
          <div className="reserve">
            <h3>
              ₹<NumericFormat className="reserve-cost" displayType="text" value={room?.roomPrice} thousandsGroupStyle="lakh" thousandSeparator="," /> <span>monthly</span>
            </h3>
            <div>
              <p>
                {guestNumber} Guest{guestNumber > 1 && "s"}
              </p>
              <div>
                <SubtractCircle onClick={() => setGuestNumber((prev) => (prev > 1 ? prev - 1 : prev))} />
                <AddCircle onClick={() => setGuestNumber((prev) => (prev < room?.roomGuests ? prev + 1 : prev))} />
              </div>
            </div>
            <button className="btn" onClick={handleReserve} disabled={room?.roomReserve}>
              {room?.roomReserve ? "Reserved" : "Reserve"}
            </button>
          </div>
        </section>
      </section>
      <section className="product-review-section">
        <h1>Guest reviews</h1>
        <ReviewItem rid={rid} />
      </section>
      <Footer />
    </main>
  );
}
