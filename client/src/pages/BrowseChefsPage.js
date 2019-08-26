import React, { useState } from "react";
import useResource from "../hooks/useResource";
import styled from "styled-components";

import { Route, Link, Switch } from "react-router-dom";
import { TiDelete, TiLocation } from "react-icons/ti";

import { layout, colors } from "../themes/theme";
import Navbar from "../components/Navbar";
import Chip from "../components/Chip";
import Button from "../components/Button";
import TextField from "../components/TextField";
import ChefCard from "../components/ChefCard";

const cuisinesArray = [
  "American",
  "British",
  "Caribbean",
  "Chinese",
  "French",
  "Greek",
  "Indian",
  "Italian",
  "Mediterranean",
  "Mexican",
  "Morrocan",
  "Spanish",
  "Thai",
  "Turkish",
  "Vietnamese"
];

const PageContainer = styled.div`
  margin-top: ${layout.navHeight};
  display: flex;
  overflow: hidden;
  .paneLeft {
    height: calc(100vh - ${layout.navHeight});
    flex-basis: 30%;
    min-width: 375px;
    padding: ${layout.spacing(3)} ${layout.spacing(5)};
    // position: sticky;
    // top: ${layout.navHeight};
  }

  .paneRight {
    height: calc(100vh - ${layout.navHeight});
    flex-grow: 1;
    overflow-y: scroll;
    padding: 0px ${layout.spacing(5)};
    background-color: ${colors.bgcolor};
  }
  .chef-container {
    display: flex;
    // justify-content: center;
    flex-wrap: wrap;
    padding: 0px;
  }

  h1 {
    font-weight: normal;
    /* margin: 40px 0px; */
  }

  nav span {
    margin-right: ${layout.spacing(4)};
    color: white;
  }

  #cuisine-label {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75rem;
  }
  .chip-list {
    list-style: none;
    padding: 0px;
    display: flex;
    flex-wrap: wrap;
  }
`;

function BrowseChefsPage({ classes, ...rest }) {
  let { resource: retrievedChefs } = useResource("chef");

  let [cuisines, setCuisines] = useState(
    cuisinesArray.reduce(
      (accum, cuisineName) => {
        accum[cuisineName] = false;
        return accum;
      },
      { all: true }
    )
  );

  function toggleCuisine(cuisineName) {
    if (cuisineName !== "all" && cuisines.all) {
      // When 'all' filter is selected, treat clicks on
      // other cusine filters as deselecting 'all'
      cuisines.all = false;
    }

    setCuisines({
      ...cuisines,
      [cuisineName]: !cuisines[cuisineName]
    });
  }

  const selectedCuisines = Object.entries(cuisines)
      .filter(entry => entry[1])
      .map(entry => (
        <Chip as="li">
          {entry[0]}
          <TiDelete
            style={{
              marginLeft: " 5px",
              fontSize: "18px",
              cursor: "pointer"
            }}
            onClick={toggleCuisine.bind(null, entry[0])}
          />
        </Chip>
      )),
    unselectedCuisines = Object.entries(cuisines)
      .filter(entry => !entry[1])
      .map(entry => (
        <Chip
          as="li"
          clickable
          outline
          onClick={toggleCuisine.bind(null, entry[0])}
        >
          {entry[0]}
        </Chip>
      ));
  console.log(selectedCuisines);
  return (
    <PageContainer className="pageContainer">
      <Navbar />

      <div className="paneLeft">
        <TextField label="Location" IconComponent={TiLocation} />
        <span id="cuisine-label">Cuisine</span>
        {selectedCuisines.length > 0 && (
          <ul className="chip-list selected">{selectedCuisines}</ul>
        )}
        {unselectedCuisines && (
          <ul className="chip-list">{unselectedCuisines}</ul>
        )}
      </div>

      <div className="paneRight">
        <h2>Available Chefs</h2>
        <ul className="chef-container">
          {!retrievedChefs ? (
            "loading..."
          ) : (
            <>
              {cuisines["all"]
                ? retrievedChefs.map(chef => <ChefCard {...chef} />)
                : retrievedChefs
                    .filter(chef => cuisines[chef.cuisine])
                    .map(chef => <ChefCard {...chef} />)}
            </>
          )}
        </ul>
      </div>
    </PageContainer>
  );
}

export default BrowseChefsPage;
