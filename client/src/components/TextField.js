import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 10px 0px;
  position: relative;
  label {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75rem;
    display: block;
  }

  input {
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 1rem;
    display: block;
    width: 250px;
    margin: 5px 0px;

    ${({ error }) =>
      error &&
      `
        border: 1px solid red;
    
    `}
  }

  span {
    position: absolute;
    bottom: -12px;
    font-size: 0.6rem;

    ${({ error }) =>
      error &&
      `
        color: red;
    
    `}
  }
`;

export default function TextField({
  label,
  name,
  helperText,
  error,
  IconComponent,
  ...rest
}) {
  return (
    <Container error={error}>
      {IconComponent && <IconComponent />}
      <label htmlFor={name}>{label}</label>
      <input type="text" name={name} {...rest} />
      <span>{helperText}</span>
    </Container>
  );
}
