import React from 'react';
import { useState, useEffect } from 'react';
import Flash from '../../services/Flash';
import Request from '../../services/Request';

function ExamTableRow(props) {
  const [examStatus, setExamStatus] = useState(props.status);

  const updateStatus = () => {
    let url = "http://localhost:8080/QuizWit/UpdateExamStatus";
    let status = examStatus == 1 ? 0 : 1;
    let data = {
        examId: props.examId,
        status
    }
    Request.post(url, data)
    .then((res) => {
        if(res.success) {
          console.log('prev: ' + examStatus)
          setExamStatus(status)
          console.log('now: ' + examStatus)
          Flash.message(res.success, 'bg-success');
        }
        else Flash.message(res.error, 'bg-danger');
    })
    
  }

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
          <td className='text-center'>{props.sectionNavigation == '1' ? <span className='success'>On</span> : <span className='danger'>Off</span>}</td>
          <td className='text-center'>{props.examTimer == '1' ? <span className='success'>On</span> : <span className='danger'>Off</span>}</td>
          <td>{props.timeDuration}</td>
          <td> 
            <div className='flex-row ai-c'>
              <label className="custom-toggle-btn mr-5">
                  <input type="checkbox" defaultChecked={examStatus == 1 ? true : false} value={props.examId} onClick={updateStatus}/>
                  <span>
                      <i className="fas fa-check"></i>
                  </span>
              </label>
              <div className='mr-10' style={{fontSize: '13px'}}>
                {examStatus == 1 ? <span className='success'><i className='fa fa-dot-circle-o mr-5'></i>Active</span> : <span className='danger'><i className='fa fa-dot-circle-o mr-5'></i>Inactive</span>}
              </div>
          
            </div>
          </td>
          <td>
            {props.createdOn}
          </td>
      </tr>
  )
}

export default ExamTableRow