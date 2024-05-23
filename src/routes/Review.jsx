import "../styles/Review.css";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { Camera } from "../components/Icons";
export default function Review() {
  const [image, setImage] = useState(null);

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
  return (
    <div className="from">
      <h1 className="create">Create Review</h1>
      <label>
        <textarea
          name="Pg/Flat"
          className="custom-textarea"
          rows={10}
          cols={110}
          placeholder="Pg/Flat details"
        />
      </label>
      <hr />
      <h3 className="overall-rating">Overall rating</h3>
      <Stack spacing={1}>
        <Rating
          name="half-rating"
          defaultValue={0}
          // size="large"
          // precision={0.5}
          sx={{ fontSize: "44px" }}
        />
      </Stack>
      <hr />
      <h3 className="add-photo">Add a photo or video</h3>
      <div className="input img-input">
        <label htmlFor="contact-img">
          <Camera />
        </label>
        <input
          id="contact-img"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {image && <img src={image} alt="user-entered-images" />}
      </div>
      <hr />
      {/* alternate for hr */}
      <h3 className="add-headline">Add a headline</h3>
      <label>
        <input
          type="text"
          className="what"
          name="headline"
          placeholder="What's most important to know"
        />
      </label>
      <h3 className="write">Write your review</h3>
      <label>
        <textarea
          name="Pg/Flat"
          className="custom-textarea2"
          rows={5}
          cols={107}
          placeholder="Pg/Flat details"
        />
      </label>
      <button className="button">Submit</button>
    </div>
  );
}
