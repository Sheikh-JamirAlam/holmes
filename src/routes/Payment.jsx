import "../styles/Payment.css";

export default function Payment() {
  return (
    <div class="page">
      <div
        className="background"
        style={{
          backgroundImage: `url('./images/payment/payment.avif')`,
        }}
      ></div>
      <div className="div-container">
        <div className="container">
          <form action="">
            <div className="row">
              <div className="col">
                <h3 className="title">billing address</h3>

                <div className="inputBox">
                  <span>full name :</span>
                  <input className="input" type="text" placeholder="john deo" />
                </div>
                <div className="inputBox">
                  <span>email :</span>
                  <input
                    className="input"
                    type="email"
                    placeholder="example@example.com"
                  />
                </div>
                <div className="inputBox">
                  <span>address :</span>
                  <input
                    className="input"
                    type="text"
                    placeholder="room - street - locality"
                  />
                </div>
                <div className="inputBox">
                  <span>city :</span>
                  <input className="input" type="text" placeholder="Mumbai" />
                </div>

                <div className="flex">
                  <div class="inputBox">
                    <span>state :</span>
                    <input className="input" type="text" placeholder="India" />
                  </div>
                  <div className="inputBox">
                    <span>zip code :</span>
                    <input
                      className="input"
                      type="text"
                      placeholder="123 456"
                    />
                  </div>
                </div>
              </div>

              <div class="col">
                <h3 class="title">payment</h3>

                <div class="inputBox">
                  <span>cards accepted :</span>
                  <img src="./images/card.png" alt="" />
                </div>
                <div class="inputBox">
                  <span>name on card :</span>
                  <input type="text" placeholder="mr. john deo" />
                </div>
                <div class="inputBox">
                  <span>credit card number :</span>
                  <input type="number" placeholder="1111-2222-3333-4444" />
                </div>
                <div class="inputBox">
                  <span>exp month :</span>
                  <input type="text" placeholder="january" />
                </div>

                <div class="flex">
                  <div class="inputBox">
                    <span>exp year :</span>
                    <input type="number" placeholder="2022" />
                  </div>
                  <div class="inputBox">
                    <span>CVV :</span>
                    <input type="text" placeholder="1234" />
                  </div>
                </div>
              </div>
            </div>

            <input
              type="submit"
              value="proceed to checkout"
              class="submit-btn"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
