import React, { Component } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement
} from "react-stripe-elements";
import styled from "styled-components";

import Button from "./Button";

const StyledForm = styled.form`
  width: 300px;
  display: flex;
  flex-wrap: wrap;
  & > div {
    margin-bottom: 1em;
  }

  #cardNumber {
    flex-basis: 100%;
  }
  #cardExpiry {
    display: inline-block;
    flex-basis: 40%;
    flex-grow: 1;
    margin-right: 10px;
  }

  #cardCVC {
    flex-grow: 1;
    display: inline-block;
    flex-basis: 40%;
  }

  .StripeElement {
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 1rem;
    margin: 5px 0px;

    font-size: 0.75rem;
  }

  button {
    display: block;
  }

  label {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75rem;
    display: block;
  }
`;

class CheckoutForm extends Component {
  render() {
    return (
      <StyledForm className="checkout">
        <p>Enter your payment details:</p>

        <div id="cardNumber">
          <label htmlFor="cardnumber">Card Number</label>
          <CardNumberElement />
        </div>

        <div id="cardExpiry">
          <label>Card Expiry</label>
          <CardExpiryElement />
        </div>
        <div id="cardCVC">
          <label>CVC</label>
          <CardCVCElement />
        </div>
      </StyledForm>
    );
  }
}

export default CheckoutForm;
