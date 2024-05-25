import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/AboutUs.css";

export default function AboutUs() {
  return (
    <main>
      <Navbar />
      <div id="heroBG" className="hero-bg search-hero-bg profile-hero-bg"></div>
      <section className="container">
        <div className="hero-image">
          <h1 className="heading">About Us</h1>
        </div>
        <div className="story-container">
          <div className="story">
            <h2>Our Story</h2>
            <p>
              Once upon a time in a bustling city, two friends, Alex and Sarah, found themselves in a quest to find the perfect flat or PG accommodation. With excitement and anticipation, they
              embarked on their journey, armed with laptops, smartphones, and a list of preferences. Their first stop was a popular flat and PG website known for its user-friendly interface and
              extensive listings. As they scrolled through the myriad of options, they couldn't help but marvel at the variety available. From cozy studio apartments to spacious shared PGs, the
              website seemed to have it all. After narrowing down their choices based on location, budget, and amenities, Alex and Sarah began contacting the property owners and managers. They were
              pleasantly surprised by the prompt responses and helpful information provided by the website's support team. Their search led them to visit several properties, each offering unique
              features and advantages. From high-rise apartments with stunning views to PGs with vibrant communal spaces, Alex and Sarah explored them all, weighing the pros and cons with each visit.
              One sunny afternoon, they stumbled upon a hidden gem—a quaint flat nestled in a quiet neighborhood, complete with modern furnishings and a serene balcony overlooking a lush garden. It
              was love at first sight, and both Alex and Sarah knew they had found their dream home. With the help of the website's secure payment gateway and seamless booking process, they swiftly
              sealed the deal and moved into their new abode. The entire experience, from browsing listings to signing the lease, was smooth and hassle-free, thanks to the efficient services offered
              by the website. As they unpacked their belongings and settled into their new home, Alex and Sarah couldn't help but reflect on their adventure. They were grateful for the convenience and
              reliability of the flat and PG website, which had turned their search into a delightful journey of discovery and fulfillment.
            </p>
          </div>
          <img className="story-img" src="./images/AboutUs/our.jpg" alt="" />
        </div>

        <div className="members-container">
          <h2 align="center">Our Team</h2>
          <div className="members">
            <div className="mem-item">
              <img src="./images/AboutUs/employee.jpg" alt="employee"></img>
              <p>SHEIKH JAMIR ALAM</p>
            </div>

            <div className="mem-item">
              <img src="./images/AboutUs/employe.jpg" alt="employee"></img>
              <p>ANKITA SUR CHOWDHURY</p>
            </div>
            <div className="mem-item">
              <img src="./images/AboutUs/employee.jpg" alt="employee"></img>
              <p>RAHUL GORAI</p>
            </div>
            <div className="mem-item">
              <img src="./images/AboutUs/employ.jpg" alt="employee"></img>
              <p>ASMA KHATUN</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
