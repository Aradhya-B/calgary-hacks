import React from 'react';

const TextBody = ({title, htmlToRender}) => {
  return (
    <div className="text-container">
      <h1>{title}</h1>
      {htmlToRender}
    </div>
  )
}

export default TextBody;