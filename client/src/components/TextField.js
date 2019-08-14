import React from "react";
import styled from "styled-components";

import { colors, layout } from "../themes/theme";

const Container = styled.div`
  margin: ${layout.spacing(2)} 0px;
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

    font-size: 0.75rem;

    ${({ error }) =>
      error &&
      `
      box-shadow: inset 0px -5px 0px 0px ${colors.error};  
      border: 1px solid ${colors.error};
    
    `}

    ${({ IconComponent }) => `padding-right: 2em;`}
  }

  span {
    position: absolute;
    bottom: -12px;
    font-size: 0.6rem;

    ${({ error }) =>
      error &&
      `
        color: ${colors.error};
    
    `}
  }

  input::placeholder {
    opacity: 0.5;
  }
`;

const InputContainer = styled.div`
  position: relative;
`;

export default function TextField({
  label,
  name,
  helperText,
  error,
  IconComponent,
  onClickIcon,
  ...rest
}) {
  if (IconComponent) {
    return (
      <Container error={error}>
        <label htmlFor={name}>{label}</label>

        <InputContainer style={{ width: "250px" }}>
          <input type="text" name={name} {...rest} />
          <IconComponent
            onClick={onClickIcon}
            style={{
              position: "absolute",
              right: "10px",
              top: "calc(50% - 0.5em)",
              width: "1em",
              color: colors.brandLight
            }}
          />
        </InputContainer>

        <span>{helperText}</span>
      </Container>
    );
  } else
    return (
      <Container error={error}>
        <label htmlFor={name}>{label}</label>
        <input type="text" name={name} {...rest} />

        <span>{helperText}</span>
      </Container>
    );
}
