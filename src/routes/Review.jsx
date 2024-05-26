import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { Camera } from "../components/Icons";
import Navbar from "../components/Navbar";
import "../styles/Review.css";
import Footer from "../components/Footer";

export default function Review() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [image, setImage] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [location, setLocation] = useState("");
  const [desc, setDesc] = useState("");
  const [rating, setRating] = useState(0);
  const rid = searchParams.get("rid");
  const userEmail = Cookies.get("auth");

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = () => {
    async function submitReview() {
      const getRes = await axios.get(`http://localhost:8080/api/user/getuser=${userEmail}`);
      if (getRes.data) {
        const res = await axios.post(`http://localhost:8080/api/reviews/addreview`, {
          roomId: rid,
          reviewAuthor: getRes.data.userName,
          reviewLocation: location,
          reviewDesc: desc,
          reviewRate: rating,
        });
        if (res.data === "Review added") {
          navigate(`/rooms/${searchParams.get("rid")}`);
        }
      }
    }
    submitReview();
  };

  useEffect(() => {
    async function getRoomInfo() {
      const res = await axios.get(`http://localhost:8080/api/rooms/getroombyid=${rid}`);
      if (res.data) {
        setRoomData(res.data);
      }
    }
    getRoomInfo();
  }, [rid]);

  return (
    <main>
      <Navbar />
      <div id="heroBG" className="hero-bg search-hero-bg profile-hero-bg"></div>
      <section className="review-container">
        <h1 className="review-create">Create Review</h1>
        <p className="review-desc">
          {roomData?.roomName} - Location {roomData?.roomAddress}
        </p>
        <hr style={{ marginTop: 0 }} />
        <h3 className="review-overall-rating">Overall rating</h3>
        <Stack spacing={1}>
          <Rating name="half-rating" sx={{ fontSize: "44px" }} onChange={(e) => setRating(parseInt(e.target.value))} />
        </Stack>
        <hr />
        <h3 className="review-add-photo">Add a photo or video</h3>
        <div className="input img-input">
          <label htmlFor="contact-img">
            <Camera />
          </label>
          <input id="contact-img" type="file" accept="image/*" onChange={handleImageChange} />
          {image && <img src={image} alt="user-entered-images" />}
        </div>
        <hr />
        <h3 className="review-add-headline">Enter your Location</h3>
        <label>
          <input type="text" className="review-what" name="headline" placeholder="Location details" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
        <h3 className="review-write">Write your review</h3>
        <label>
          <textarea name="Pg/Flat" className="review-custom-textarea2" rows={5} cols={107} placeholder="Pg/Flat details" value={desc} onChange={(e) => setDesc(e.target.value)} />
        </label>
        <button className="btn review-btn" onClick={handleSubmit}>
          Submit
        </button>
      </section>
      <Footer />
    </main>
  );
}
