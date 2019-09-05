import React, { useState, useContext } from "react";
import useToggle from "../hooks/useToggle";
import { Elements, injectStripe } from "react-stripe-elements";
import styled from "styled-components";

import Context from "../store/createContext";
import { callAPI } from "../helpers/api";
import { layout, colors } from "../themes/theme";
import Snackbar from "../components/Snackbar";
import Navbar from "../components/Navbar";
import CheckoutForm from "../components/CheckoutForm";
import OrderDetails from "../components/OrderDetails";

const PageContainer = styled.div`
  display: flex;
  align-items: stretch;
  margin-top: ${layout.navHeight};
  background-color: ${colors.bgcolor};
  h1 {
    font-weight: normal;
  }

  .paneLeft {
    height: calc(100vh - ${layout.navHeight});
    width: 60%;
    min-width: 400px;
    background-color: white;
    box-shadow: 1px 7px 20px ${colors.bgcolor};

    h1 {
      font-weight: normal;
      margin: 0px;
      border-bottom: 1px solid ${colors.faint};
    }

    & > h1,
    & > div {
      padding: ${layout.spacing(3)} ${layout.spacing(10)};
    }
  }
  .paneRight {
    height: calc(100vh - ${layout.navHeight});
    width: 40%;
    overflow: hidden;
  }
`;

function withStripe(Component) {
  const Injected = injectStripe(Component);

  return () => (
    <Elements>
      <Injected />
    </Elements>
  );
}

const CheckoutPage = ({ stripe }) => {
  const [loading, toggleLoading] = useToggle(false),
    [paymentComplete, togglePaymentComplete] = useToggle(false),
    [error, setError] = useState(null),
    { order, user } = useContext(Context);
  console.log("Order context:",order);
  async function onSubmit(e) {
    e.preventDefault();

    toggleLoading();

    let { token } = await stripe.createToken({ name: user.name });

    // token will be 'undefined' if
    if (token) {
      let response = await callAPI({
        endpoint: "payment",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: { tokenId: token.id, totalPrice: order.price }
      });

      if (response.status === "succeeded") {
        togglePaymentComplete();
        toggleLoading();
      }
    } else {
      setError("All form fields are required.");
    }
  }

  return (
    <>
      <Navbar />
      <PageContainer className="pageContainer">
        <div className="paneLeft">
          <h1>Checkout</h1>
          <div>
            {paymentComplete ? <h2>Purchase Complete</h2> : <CheckoutForm />}
          </div>

          {error && <Snackbar message={error} onClose={() => setError(null)} />}
        </div>
        <div className="paneRight">
          <OrderDetails
            items={order.dishes}
            arrivalTime={order.bookedTime}
            price={order.price}
            onSubmit={onSubmit}
          />
        </div>
      </PageContainer>
    </>
  );
};

// export default CheckoutPage;
export default withStripe(CheckoutPage);
