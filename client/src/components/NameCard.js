import React from "react";
import styled from "styled-components";
import Button from "./Button";


const Container = styled.div`


    height:100%;
    display : flex;
	flex-direction: column;
    justify-content:space-between;
    
    #cover{
        max-width:100%;
    }

    #profile{
        display:block;
        margin-left:auto;
        margin-right:auto;
    }

    #name, #location, #desc{
        text-align:center;
    }

`;

const RequestButton = styled(Button)`
  width:100%;
`;

export default function Namecard({  }) {
  return (

    <Container>

            <img id="cover" alt="background" src="/cover-sushi.png" />
            <img id="profile" alt="profile" src="/userpic-6.png" />
            <p id="name"> Atsushi Mikaki </p>
            <p id="location"> Toronto Canada </p>
            <p id="desc">Chef with 8 years in Japanese cuisine. Reciepient of awards and positive feedback </p>

        <RequestButton type="submit" >
            Send Request
        </RequestButton>
    </Container>
  );
}
