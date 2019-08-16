import React from "react";
import { Elements } from "react-stripe-elements";
import styled from "styled-components";

import { layout, colors } from "../themes/theme";
import Navbar from "../components/Navbar";
import CheckoutForm from "../components/CheckoutForm";
import OrderDetails from "../components/OrderDetails";

const mockOrderItems = [
  {
    name: "2 yakisoba dishes, 6 something else, 4 something else",
    price: 30,
    imageURL: "https://picsum.photos/200"
  },
  {
    name: "5 specialty sushi rolls",
    price: 23.5,
    imageURL: "https://picsum.photos/200"
  }
];

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
      padding: ${layout.spacing(3)} ${layout.spacing(7)};
    }

    /* display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; */
  }
  .paneRight {
    height: calc(100vh - ${layout.navHeight});
    width: 40%;
    overflow: hidden;
  }
`;
const CheckoutPage = () => {
  return (
    <>
      <Navbar />
      <PageContainer className="pageContainer">
        <div className="paneLeft">
          <h1>Checkout</h1>
          <div>
            <Elements>
              <CheckoutForm />
            </Elements>
          </div>
        </div>
        <div className="paneRight">
          <OrderDetails items={mockOrderItems} arrivalTime={new Date()} />
        </div>
      </PageContainer>
    </>
  );
};

export default CheckoutPage;
