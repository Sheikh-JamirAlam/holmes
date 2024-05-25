import "../styles/Payment.css";

export default function Payment() {
  return (
    <div class="payment-page">
      <div
        className="payment-background"
        style={{
          backgroundImage: `url('./images/payment/payment.avif')`,
        }}
      ></div>
      <div className="payment-div-container">
        <div className="payment-container">
          <form>
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
                    placeholder="room - street - locality"
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
                  <div class="payment-inputBox">
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

              <div class="payment-col">
                <h3 class="payment-title">payment</h3>

                <div class="payment-inputBox">
                  <span>Cards accepted :</span>
                  <img src="./images/card.png" alt="" />
                </div>
                <div class="payment-inputBox">
                  <span>Name on card :</span>
                  <input type="text" placeholder="mr. john deo" />
                </div>
                <div class="payment-inputBox">
                  <span>Credit card number :</span>
                  <input type="number" placeholder="1111-2222-3333-4444" />
                </div>
                <div class="payment-inputBox">
                  <span>Exp month :</span>
                  <input type="text" placeholder="january" />
                </div>

                <div class="payment-flex">
                  <div class="payment-inputBox">
                    <span>Exp year :</span>
                    <input type="number" placeholder="2022" />
                  </div>
                  <div class="payment-inputBox">
                    <span>CVV :</span>
                    <input type="text" placeholder="1234" />
                  </div>
                </div>
              </div>
            </div>

            <input
              type="submit"
              value="Proceed to Checkout"
              class="payment-submit-btn"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
