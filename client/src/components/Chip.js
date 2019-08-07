import React from "react";
import styled from "styled-components";
import { colors } from "../themes/theme";

const Container = styled.span`
  display: flex;
  align-items: center;

  background: ${({ outline }) => (outline ? "white" : colors.brandLight)};
  color: ${({ outline }) => (outline ? colors.brand : "white")};
  border: ${({ outline }) =>
    outline ? `1px solid ${colors.brandLight}` : "none"};
  padding: 10px;
  margin: 0px 10px 10px 0px;
  line-height: 1.5;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  ${props => props.clickable && "cursor: pointer; "}

  transition: 100ms all;
  &:hover {
    ${props =>
      props.outline &&
      props.clickable &&
      `background-color: ${colors.brandLight}; color: white;`}
  }
`;

const Chip = ({ children, ...rest }) => {
  return <Container {...rest}>{children}</Container>;
};

export default Chip;
