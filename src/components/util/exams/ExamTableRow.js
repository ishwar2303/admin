import React from 'react';
import { useState, useEffect } from 'react';
import Flash from '../../services/Flash';
import Request from '../../services/Request';
import UpdateExamStatus from './UpdateExamStatus';

function ExamTableRow(props) {

  return (
      <tr key={props.examId} id={'EXAM_ID' + props.examId}>
          <td className='custom-radio-container'>
            <div className='flex-row jc-c'>
              <label className='custom-radio'>
                <input type="radio" name="examId" value={props.examId}/>
                <span>
                  <i className='fas fa-check'></i>
                </span>
              </label>
            </div>
          </td>
          <td className='text-left'>{props.serialNo}</td>
          <td className='exam-title-value text-left'>{props.title}</td>
          <td className='text-left'>{props.visibility == 1 ? <span className='primary'><i className='fas fa-lock mr-5'></i> Private</span> : <span><i className='fas fa-lock-open mr-5'></i>Public</span> }</td>
          <td className='text-left'>
            {props.startTime}
          </td>
          <td className='text-left'>
            {props.endTime}
          </td>
          <td className='text-left'>
            {props.windowTime}
          </td>
          <td className='text-center'>{props.sectionNavigation == '1' ? <span className='success'>On</span> : <span className='danger'>Off</span>}</td>
          <td className='text-center'>{props.examTimer == '1' ? <span className='success'>On</span> : <span className='danger'>Off</span>}</td>
          <td>{props.timeDuration}</td>
          <td> 
            <div className='flex-row ai-c'>
              <UpdateExamStatus status={props.status} examId={props.examId} updateErrors={props.updateErrors}/>
            </div>
          </td>
          <td>
            {props.createdOn}
          </td>
      </tr>
  )
}

export default ExamTableRow