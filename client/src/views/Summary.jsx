import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Flashbar from '../components/Flashbar';
import TextBody from '../components/TextBody';
import Modal from '../components/Modal';
import styled from 'styled-components';
import original from '../reducers/original';
import ModalLink from '../components/ModalLink';
import { ADD_MODAL } from '../actions/types';
const reactStringReplace = require('react-string-replace');

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
  flex: 1 0 25%;
  max-width: 33%;
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
  const modals = useSelector(state => state.modals);
  const originalText = useSelector(state => state.original);
  const summary = useSelector(state => state.summary);
  const keywordMap = useSelector(state => state.keywordMap);

  const getTextWithHyperlinks = (keywordMap, originalText) => {
    let textWithHyperlink = originalText;

    Object.keys(keywordMap).forEach(keyword => {
      textWithHyperlink = reactStringReplace(textWithHyperlink, keyword, (match, i) => <ModalLink key={match + i + Math.random(10000)} str={keyword} />)
    });

    textWithHyperlink = reactStringReplace(textWithHyperlink, '\n', (match, i) => <div><br/></div>);

    return textWithHyperlink;
  }

  return (
    <Container>
      <Flashbar />
      <NotesContainer>
        <TextBody htmlToRender={getTextWithHyperlinks(keywordMap, originalText)} />
        <TextBody htmlToRender={getTextWithHyperlinks(keywordMap, summary)} />
        { 
          modals && modals.length ?
          <ModalContainer>
            {
              modals.map(modal => 
                <Modal key={modal.keyword} keyword={modal.keyword} htmlToRender={modal.htmlToRender} />
              )
            }
          </ModalContainer> :
          null
        }
      </NotesContainer>
    </Container>
  )
}

export default Summary;