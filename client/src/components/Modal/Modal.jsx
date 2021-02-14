import React from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  margin: 1rem 0.5rem;
  padding: 2rem;
  padding-top: 0;
  height: 20em;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  overflow-y: scroll;
`

const Modal = ({keyword, htmlToRender}) => {
  return (
    <ModalContainer>
      <h1>{keyword}</h1>
      <p style={{lineHeight: "1.5em"}}>{htmlToRender}</p>
    </ModalContainer>
  )
}

export default Modal;