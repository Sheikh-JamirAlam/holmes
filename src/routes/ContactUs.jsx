import { useState } from "react";
import { Camera, CrossInCircle } from "../components/Icons";
import "../styles/Login.css";

export default function ContactUs() {
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
    <section>
      <div className="login-container contact-container">
        <a className="close-cross" href="/">
          <CrossInCircle />
        </a>
        <h1 className="heading">Contact Us</h1>
        <p>Feel free to contact us anytime.We will get back to you as soon as we can.</p>
        <div className="input-container">
          <div className="input">
            <input type="text" placeholder="Enter your name" />
          </div>
          <div className="input">
            <input type="email" placeholder="Enter email address" />
          </div>
          <div className="input">
            <textarea rows={5} type="text" placeholder="Enter your message" />
          </div>
          <div className="input img-input">
            <label htmlFor="contact-img">
              <Camera />
            </label>
            <input id="contact-img" type="file" accept="image/*" onChange={handleImageChange} />
            {image && <img src={image} alt="user-entered-images" />}
          </div>
          <button className="button">Submit</button>
        </div>
      </div>
    </section>
  );
}
