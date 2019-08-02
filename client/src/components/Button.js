import React from "react";
import styled from "styled-components";

import { colors } from "../themes/theme";
const { brand, brandLight } = colors;

const Button = styled.button`
  padding: 15px;
  color: white;
  background: ${brandLight};
  font-family: "Montserrat";
  cursor: pointer;
  border: none;
  min-width: 150px;

  &:hover,
  &:active {
    background-color: ${brand};

    ${({ outline }) => outline && `color: ${"white"};`}
  }

  transition: background-color 100ms;

  ${({ outline }) =>
    outline &&
    `border: 1px solid ${brandLight}; color: ${brandLight}; background-color: white`}

`;

export default Button;
