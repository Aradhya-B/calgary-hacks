import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Flashbar from '../components/Flashbar';
import TextBody from '../components/TextBody';
import Modal from '../components/Modal';
import styled from 'styled-components';

const NotesContainer = styled.section`
  display: flex;
  justify-content: space-evenly;
  overflow: hidden;
`

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1rem 0;
  flex: 1 0 35%;
  max-width: 50%;
  border-left: 1px solid #d3d3d3;
  background-color: #f4f4f4;
  overflow-y: scroll;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
`

const Summary = () => {
  // const modals = useSelector(state => state.modals);
  const modals = [{keyword: 'Processor', htmlToRender: 'test'}, {keyword: 'Processor', htmlToRender: 'test'}, {keyword: 'Processor', htmlToRender: 'test'}]

  return (
    <Container>
      <Flashbar />
      <NotesContainer>
        <TextBody htmlToRender={"test"} />
        <ModalContainer>
          {
            modals.map(modal => 
              <Modal keyword={modal.keyword} htmlToRender={modal.htmlToRender} />
            )
          }
        </ModalContainer>
      </NotesContainer>
    </Container>
  )
}

export default Summary;