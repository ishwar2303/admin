import React from 'react';

function LoaderHeading(props) {
  return (
    <>
        <div className='loader-heading flex-row'>
          <div className='flex-full flex-row jc-sb ai-c pl-10 pr-10'>
            <div className='component-heading'>
              {props.description}
            </div>
            <div>
              {props.component}
            </div>
          </div>
        </div>
    </>
  );
}

export default LoaderHeading;
