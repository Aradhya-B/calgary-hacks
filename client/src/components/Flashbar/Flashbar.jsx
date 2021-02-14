import React from 'react';
import styled from 'styled-components';

const FlashbarWrapper = styled.section`
  padding: 0 1em;
  background: #4BB543;
  display: flex;
  justify-content: space-between;
`;

const StyledFlashbarText = styled("div")`
  margin: 0.5em;
  padding: 0 1em;
  color: white;
  font-family: medium-content-sans-serif-font, sans-serif;
`

const StyledButton = styled("button")`
  margin: auto 1em;
  display:inline-block;
  padding:0.5em 1.2em;
  border:0.1em solid #FFFFFF;
  border-radius:0.12em;
  box-sizing: border-box;
  text-decoration:none;
  font-family:'Roboto',sans-serif;
  font-weight:300;
  color:#000000;
  background-color:#FFFFFF;
`

const Flashbar = () => {
  return (
    <FlashbarWrapper>
      <StyledFlashbarText>
        <p style={{fontWeight: 600}}>Your supercharged notes are ready!</p>
      </StyledFlashbarText>
      <StyledButton>
        Upload another document
      </StyledButton>
    </FlashbarWrapper>
  )
}

export default Flashbar;