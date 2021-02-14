import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addModal } from '../../actions';

const ModalLink = ({str}) => {
  const keywordMap = useSelector(state => state.keywordMap);
  const dispatch = useDispatch();
  const openModal = (keyword) => {
    dispatch(addModal({keyword: keyword, htmlToRender: keywordMap[keyword]}));
  }

  return (
    <button className="link-button" onClick={() => openModal(str)}>{str}</button>
  )
}

export default ModalLink;