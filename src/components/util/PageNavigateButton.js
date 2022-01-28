import React from 'react';
import '../css/PageNavigateButton.css'

function PageNavigateButton(props) {
  return (
      <label className='page-navigate-btn'>
          <input type="radio" name="pageNumber" value={props.number}/>
          <span onClick={props.onclick}>{props.number}</span>
      </label>
  );
}

export default PageNavigateButton;
