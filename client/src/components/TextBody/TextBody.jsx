import React from 'react';

const TextBody = ({htmlToRender}) => {
  return (
    <div className="text-container">
      <p>
        {htmlToRender}
      </p>
    </div>
  )
}

export default TextBody;