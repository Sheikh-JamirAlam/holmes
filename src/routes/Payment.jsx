import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import "../styles/Payment.css";

export default function Payment() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    setOpen(true);
  };

  return (
    <div className="payment-page">
      <div
        className="payment-background"
        style={{
          backgroundImage: `url('./images/payment/payment.avif')`,
        }}
      ></div>
      <div className="payment-div-container">
        <div className="payment-container">
          <div className="payment-form-container">
            <div className="payment-row">
              <div className="payment-col">
                <h3 className="payment-title">billing address</h3>

                <div className="payment-inputBox">
                  <span>Full Name :</span>
                  <input
                    className="payment-input"
                    type="text"
                    placeholder="John Deo"
                  />
                </div>
                <div className="payment-inputBox">
                  <span>Email :</span>
                  <input
                    className="payment-input"
                    type="email"
                    placeholder="1234@gmail.com"
                  />
                </div>
                <div className="payment-inputBox">
                  <span>Address :</span>
                  <input
                    className="payment-input"
                    type="text"
                    placeholder="Street - Locality"
                  />
                </div>
                <div className="payment-inputBox">
                  <span>City :</span>
                  <input
                    className="payment-input"
                    type="text"
                    placeholder="Mumbai"
                  />
                </div>

                <div className="payment-flex">
                  <div className="payment-inputBox">
                    <span>State :</span>
                    <input
                      className="payment-input"
                      type="text"
                      placeholder="India"
                    />
                  </div>
                  <div className="payment-inputBox">
                    <span>Zip code :</span>
                    <input
                      className="payment-input"
                      type="text"
                      placeholder="123 456"
                    />
                  </div>
                </div>
              </div>

              <div className="payment-col">
                <h3 className="payment-title">payment</h3>

                <div className="payment-inputBox">
                  <span>Cards accepted :</span>
                  <img src="./images/card.png" alt="" />
                </div>
                <div className="payment-inputBox">
                  <span>Name on card :</span>
                  <input type="text" placeholder="Mr. John Deo" />
                </div>
                <div className="payment-inputBox">
                  <span>Credit card number :</span>
                  <input type="number" placeholder="1111-2222-3333-4444" />
                </div>
                <div className="payment-inputBox">
                  <span>Exp month :</span>
                  <input type="text" placeholder="January" />
                </div>

                <div className="payment-flex">
                  <div className="payment-inputBox">
                    <span>Exp year :</span>
                    <input type="number" placeholder="2022" />
                  </div>
                  <div className="payment-inputBox">
                    <span>CVV :</span>
                    <input type="text" placeholder="1234" />
                  </div>
                </div>
              </div>
            </div>
            <button className="payment-submit-btn" onClick={handleSubmit}>
              Proceed to Checkout
            </button>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
              onClick={handleClose}
            >
              <div className="payment-success-container">
                <div className="checkmark-circle">
                  <div className="checkmark"></div>
                </div>
                <h1 className="paymentS-h1">Payment Successful!</h1>
                <p className="paymentS-p">Thank you for your purchase.</p>
              </div>
            </Backdrop>
          </div>
        </div>
      </div>
    </div>
  );
}
