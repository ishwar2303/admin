import React from 'react';

function LoaderHeading(props) {
  return (
    <>
        <div className='loader-heading'>
            {props.description}
        </div>
        <div className='loader-heading-fix-height'></div>
    </>
  );
}

export default LoaderHeading;
