import React from "react";
import styled from "styled-components";
import Chip from "./Chip";

const Container = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  list-style: none;
  flex-shrink: 1;

  max-width: 300px;
  height: 375px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 20px 40px;
  margin: 0px 10px 10px 0px;
  background-color: white;

  transition: transform 200ms;
  &:hover {
    transform: translate(0px, -5px);
  }

  h1,
  h3 {
    margin: 0px;
  }
  h1 {
    font-size: 28px;
  }
  h3 {
    font-size: 18px;
    font-weight: normal;
    color: rgba(0, 0, 0, 0.3);
  }

  p {
    margin: 0px;
  }

  img {
    border-radius: 50%;
    width: 100px;
  }
`;

const ChefCard = ({ name, avatarUrl, location, description, cuisine }) => {
  return (
    <Container>
      <img src={avatarUrl} alt="Chef" />
      <div>
        <h1>{name}</h1>
        <h3>{location}</h3>
      </div>
      <Chip style={{ margin: "0px" }}>{cuisine}</Chip>
      <p>{description}</p>
    </Container>
  );
};

export default ChefCard;
