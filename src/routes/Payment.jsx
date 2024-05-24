import Razorpay from "razorpay";
import "../styles/Payment.css";

export default function Payment() {
  function handleCheckout(e) {
    e.preventDefault();
    const rzp_options = {
      key: "rzp_test_nqj132lgUblXYx",
      amount: this.product.price * 100,
      name: "The Bollywood Store",
      description: this.product.title,
      handler: function (response) {
        alert(`Payment Succesful ${response.razorpay_payment_id}`);
      },
      modal: {
        ondismiss: function () {
          alert(`Payment Failed`);
        },
      },
      prefill: {
        email: "test@email.com",
        contact: +914455667788,
      },
      notes: {
        name: "Customer Name",
        // item: self.product.title,
      },
      theme: {
        color: "#667eea",
      },
    };
    const rzp1 = new Razorpay(rzp_options);
    rzp1.open();
  }

  return (
    <div className="page">
      <div
        className="background"
        style={{
          backgroundImage: `url('./images/payment/payment.avif')`,
        }}
      ></div>
      <div className="div-container">
        <div className="container">
          <form>
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
                  <div className="inputBox">
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

              <div className="col">
                <h3 className="title">payment</h3>

                <div className="inputBox">
                  <span>cards accepted :</span>
                  <img src="./images/card.png" alt="" />
                </div>
                <div className="inputBox">
                  <span>name on card :</span>
                  <input type="text" placeholder="mr. john deo" />
                </div>
                <div className="inputBox">
                  <span>credit card number :</span>
                  <input type="number" placeholder="1111-2222-3333-4444" />
                </div>
                <div className="inputBox">
                  <span>exp month :</span>
                  <input type="text" placeholder="january" />
                </div>

                <div className="flex">
                  <div className="inputBox">
                    <span>exp year :</span>
                    <input type="number" placeholder="2022" />
                  </div>
                  <div className="inputBox">
                    <span>CVV :</span>
                    <input type="text" placeholder="1234" />
                  </div>
                </div>
              </div>
            </div>

            <button onSubmit={handleCheckout} className="submit-btn">
              Proceed to checkout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
