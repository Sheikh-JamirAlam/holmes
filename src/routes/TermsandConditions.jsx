import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/TermsandConditions.css";

export default function TermsandConditions() {
  return (
    <>
      <Navbar />
      <div id="heroBG" className="hero-bg search-hero-bg profile-hero-bg"></div>
      <div className="terms-container">
        <h1 className="TandC-h1">Terms and Conditions</h1>
        <p className="TandC-p">
          Welcome to our website. If you continue to browse and use this
          website, you are agreeing to comply with and be bound by the following
          terms and conditions of use.
        </p>
        <h2 className="TandC-h2">1. General</h2>
        <p className="TandC-p">
          The content of the pages of this website is for your general
          information and use only. It is subject to change without notice.
        </p>
        <h2 className="TandC-h2">2. Booking</h2>
        <p className="TandC-p">
          Your booking is subject to availability and approval by the property
          owner or management. By making a booking, you agree to abide by the
          property's terms and conditions, including payment policies and
          cancellation policies.
        </p>
        <h2 className="TandC-h2">3. Payment</h2>
        <p className="TandC-p">
          Payment is required in full at the time of booking, unless otherwise
          specified by the property. Accepted forms of payment may vary and are
          subject to the property's discretion.
        </p>
        <h2 className="TandC-h2">4. Cancellation</h2>
        <p className="TandC-p">
          Cancellation policies vary depending on the property and the terms of
          your booking. Please refer to the booking confirmation email or
          contact customer support for more information.
        </p>
        <h2 className="TandC-h2">5. Disclaimer</h2>
        <p className="TandC-p">
          The information provided on this website is for general informational
          purposes only. While we strive to keep the information up to date and
          correct, we make no representations or warranties of any kind, express
          or implied, about the completeness, accuracy, reliability,
          suitability, or availability with respect to the website or the
          information, products, services, or related graphics contained on the
          website for any purpose.
        </p>
        <p className="TandC-p">
          Your use of any information or materials on this website is entirely
          at your own risk, for which we shall not be liable. It shall be your
          own responsibility to ensure that any products, services, or
          information available through this website meet your specific
          requirements.
        </p>
        <p className="TandC-p">
          In no event will we be liable for any loss or damage including without
          limitation, indirect or consequential loss or damage, or any loss or
          damage whatsoever arising from loss of data or profits arising out of,
          or in connection with, the use of this website.
        </p>
      </div>
      <Footer />
    </>
  );
}
