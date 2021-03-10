import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RESET_STATE } from '../../actions/types';

const FlashbarWrapper = styled.section`
  padding: 0 1em;
  background: #00A5E0;
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
  font-family:'Open Sans',sans-serif;
  font-weight:600;
  color:#000000;
  background-color:#FFFFFF;
`

const Flashbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const goHome = () => {
    dispatch({type: RESET_STATE});
    history.push('/')
  }

  return (
    <FlashbarWrapper>
      <StyledFlashbarText>
        <p style={{fontWeight: 600}}>Your super charged research paper is ready!</p>
      </StyledFlashbarText>
      <StyledButton onClick={goHome}>
        Upload another document
      </StyledButton>
    </FlashbarWrapper>
  )
}

export default Flashbar;
