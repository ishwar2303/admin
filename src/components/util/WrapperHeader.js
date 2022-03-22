import React from 'react';
import '../css/WrapperHeader.css';
function WrapperHeader(props) {
  return (
    <div className='wrapper-header'>
      <div className='secondary'>{props.heading}</div>
      <div>{props.component}</div>
    </div>
  )
}

export default WrapperHeader;