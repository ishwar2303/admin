import React from 'react';
import '../css/ExamCard.css';

function ExamCard(props) {
  return (
      <div className='exam-card'>
          <div className='bold mb-20'>{props.firstName} {props.lastName}</div>
          <div className='flex-row jc-sb'>
            <div className=''>{props.email}</div>
            <div className=''>{props.contact}</div>
          </div>
      </div>
  );
}

export default ExamCard;
