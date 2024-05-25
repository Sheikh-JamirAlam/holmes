import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Privacy.css";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <div id="heroBG" className="hero-bg search-hero-bg profile-hero-bg"></div>
      <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
        <h1 className="privacy-h1">Privacy Policy</h1>
        <p className=".privacy-p">
          Welcome to [Your Website Name]. This Privacy Policy explains how we
          collect, use, disclose, and safeguard your information when you visit
          our website [yourwebsite.com], use our services, or interact with us.
        </p>

        <h2 className="privacy-h2">Information We Collect</h2>
        <ul>
          <li>
            <strong>Personal Data:</strong> Name, email address, phone number,
            etc.
          </li>
          <li>
            <strong>Usage Data:</strong> Information on how you access and use
            the website.
          </li>
          <li>
            <strong>Cookies:</strong> Data collected through cookies and similar
            tracking technologies.
          </li>
        </ul>

        <h2 className="privacy-h2">How We Use Your Information</h2>
        <ul>
          <li>To provide, operate, and maintain our website and services.</li>
          <li>To improve, personalize, and expand our website and services.</li>
          <li>To understand and analyze how you use our website.</li>
          <li>
            To develop new products, services, features, and functionality.
          </li>
          <li>
            To communicate with you, either directly or through one of our
            partners, including for customer service, to provide you with
            updates and other information relating to the website, and for
            marketing and promotional purposes.
          </li>
        </ul>

        <h2 className="privacy-h2">Sharing Your Information</h2>
        <p>We may share your information in the following situations:</p>
        <ul>
          <li>With service providers to perform services on our behalf.</li>
          <li>To comply with legal obligations.</li>
          <li>With your consent.</li>
        </ul>

        <h2 className="privacy-h2">Security of Your Information</h2>
        <p className=".privacy-p">
          We use administrative, technical, and physical security measures to
          help protect your personal information.
        </p>

        <h2 className="privacy-h2">Your Data Protection Rights</h2>
        <p className=".privacy-p">
          Depending on your location, you may have the following rights
          regarding your personal data:
        </p>
        <ul>
          <li>
            The right to access – You have the right to request copies of your
            personal data.
          </li>
          <li>
            The right to rectification – You have the right to request that we
            correct any information you believe is inaccurate.
          </li>
          <li>
            The right to erasure – You have the right to request that we erase
            your personal data, under certain conditions.
          </li>
        </ul>

        <h2 className="privacy-h2">Changes to This Privacy Policy</h2>
        <p className=".privacy-p">
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page.
        </p>

        <h2 className="privacy-h2">Contact Us</h2>
        <p className=".privacy-p">
          If you have any questions about this Privacy Policy, please contact us
          at: [Your Contact Information]
        </p>

        <p className=".privacy-p">Last updated: [Date]</p>
      </div>
      <Footer />
    </>
  );
}
