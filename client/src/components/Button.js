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
  }

  transition: background-color 100ms;
`;

//     ({ children }) => {
//     return (
//         <button
//             style={{
//                 padding: 15,
//                 color: "white",
//                 background: "#FF510C",
//                 border: "none",
//                 margin: "0px 5px",
//                 fontFamily: "Montserrat",
//                 cursor: "pointer"
//             }}
//         >
//             {children}
//         </button>
//     );
// };

export default Button;
