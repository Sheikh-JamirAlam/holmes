import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Arrow } from "../components/Icons";
import "../styles/Faq.css";
// import { SlArrowDown } from "react-icons/sl";

export default function FAQPage() {
  const faqs = [
    {
      question: "How do I book a flat?",
      answer: "You can book a flat by going to our website and selecting the desired flat from the available options. Then, follow the instructions to complete the booking process.",
    },
    {
      question: "What are the payment options available?",
      answer: "We accept payments via credit/debit cards, online bank transfer, and cash. Please note that payment methods may vary depending on the specific property.",
    },
    {
      question: "Can I cancel my booking?",
      answer:
        "Yes, you can cancel your booking. However, cancellation policies vary depending on the property and the terms of your booking. Please refer to the booking confirmation email or contact customer support for more information.",
    },
    {
      question: "Are utilities included in the rent?",
      answer:
        "Yes, utilities such as electricity, water, and internet may be included in the rent. However, it depends on the specific property and the terms of your rental agreement. Please check the property listing or contact the landlord for more information.",
    },
    {
      question: "Is there a security deposit required?",
      answer:
        "Yes, landlords may require a security deposit before you move in. The amount of the deposit and the terms for its return vary depending on the landlord and the rental agreement. Make sure to clarify these details with the landlord before making any payments.",
    },
    {
      question: "Can I bring guests to my PG accommodation?",
      answer:
        "It depends on the rules set by the landlord or property management. Some accommodations may allow guests with prior approval, while others may have restrictions or additional charges for guests staying overnight. Be sure to check the guest policy with your landlord.",
    },
    {
      question: "What amenities are included in the PG accommodation?",
      answer:
        "The amenities provided in PG accommodations vary depending on the property. Common amenities may include Wi-Fi, furniture, kitchen appliances, laundry facilities, and security features. Please check the property listing or contact the landlord for a detailed list of amenities.",
    },
    {
      question: "Is parking available for residents?",
      answer:
        "Parking availability depends on the property and its location. Some PG accommodations may offer parking facilities for residents, while others may not. If parking is available, there may be additional charges or restrictions. Please inquire with the landlord about parking options.",
    },
    {
      question: "How long can I stay in the PG accommodation?",
      answer:
        "The duration of your stay in a PG accommodation may vary depending on the property and the terms of your rental agreement. Some accommodations offer short-term rentals, while others may require longer lease commitments. Please discuss your intended length of stay with the landlord before booking.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  function toggleFAQ(index) {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  }

  return (
    <>
      <Navbar />
      <div id="heroBG" className="hero-bg search-hero-bg profile-hero-bg"></div>
      <div className="faq-container">
        <h1 className="faq-header">FAQ</h1>
        <div className="faq-content">
          {faqs.map((faq, index) => (
            <div className="faq-item" key={index}>
              <div className={`faq-question ${activeIndex === index ? "active" : ""}`} onClick={() => toggleFAQ(index)}>
                <span>{faq.question}</span>
                <Arrow className={`arrow ${activeIndex === index ? "active" : ""}`} />
              </div>
              <div className={`faq-answer ${activeIndex === index ? "active" : ""}`}>{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
