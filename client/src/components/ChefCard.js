import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import Chip from "./Chip";
import { fadeIn } from "../constants/animations";
import { colors } from "../themes/theme";

const Container = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  list-style: none;
  flex-shrink: 1;

  width: calc(33% - 20px);
  max-width: 300px;
  height: 320px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 20px 40px;
  margin: 0px 10px 10px 0px;
  background-color: white;

  animation: ${fadeIn} 1000;
  transition: transform 200ms;
  &:hover {
    transform: translate(0px, -5px);
  }

  cursor: pointer;

  h1,
  h3 {
    margin: 0px;
  }
  h1 {
    font-size: 18px;
  }
  h3 {
    font-size: 12px;
    font-weight: normal;
    color: rgba(0, 0, 0, 0.5);
  }

  p {
    margin: 0px;
    font-size: 12px;
  }

  img {
    border-radius: 50%;
    width: 100px;
  }
`;

const ChefCard = ({
  name,
  avatar,
  strlocation,
  description,
  cuisine,
  history,
  _id
}) => {
  function redirectToChefProfile() {
    history.push(`/chef/${_id}`);
  }

  return (
    <Container onClick={redirectToChefProfile}>
      <img src={avatar} alt="Chef" />
      <div>
        <h1>{name}</h1>
        <h3>{strlocation}</h3>
      </div>
      {cuisine ? (
        <Chip style={{ margin: "0px" }}>{cuisine}</Chip>
      ) : (
        <hr
          style={{
            backgroundColor: colors.brand,
            border: "none",
            height: 1,
            width: "35%"
          }}
        ></hr>
      )}
      <p>{description}</p>
    </Container>
  );
};

export default withRouter(ChefCard);
