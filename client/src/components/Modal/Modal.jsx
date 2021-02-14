import React from 'react';
import styled from 'styled-components';
import { removeModal } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

const ModalContainer = styled.div`
  margin: 1rem 0.5rem;
  padding: 2rem;
  padding-top: 0;
  min-height: 20em;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  overflow-y: scroll;
  position: relative;
`

const CloseButton = styled.div `
  position: absolute;
  top: 0;
  right: 0;
  font-size: 20px;
  color: #808080;
  &:hover {
    cursor: pointer;
  }
`

const Modal = ({keyword, htmlToRender}) => {
  const dispatch = useDispatch();
  const closeModal = (keyword) => {
    dispatch(removeModal(keyword));
  }
  return (
    <ModalContainer>
      <CloseButton onClick={() => closeModal(keyword)}>✖️</CloseButton>
      <h1>{keyword}</h1>
      <p style={{lineHeight: "1.5em"}}>{htmlToRender}</p>
    </ModalContainer>
  )
}

export default Modal;