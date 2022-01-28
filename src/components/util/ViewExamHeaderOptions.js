import React from 'react';
import '../css/ViewExamHeaderOptions.css';

function ViewExamHeaderOptions(props) {
  return (
      <div className='view-exam-header-options flex-row jc-e ai-c'>
          <div className='btn-primary btn-small mr-10' id='current-page'>0</div>
          <div className='search-input-container'>
            <i className='fas fa-search'></i>
            <input type='text' name='searchExamTitle' placeholder='Search via exam title...' />
          </div>
          <div>
              <button id="refresh-btn" className='btn btn-primary btn-small' onClick={props.onclick}>
                  <i className='fas fa-sync'></i>
              </button>
          </div>
      </div>
  );
}

export default ViewExamHeaderOptions;
