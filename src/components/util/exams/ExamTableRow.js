import React from 'react'

function ExamTableRow(props) {
  return (
      <tr key={props.examId}>
          <td>{props.serialNo}</td>
          <td>{props.title}</td>
          <td>{props.visibility}</td>
          <td>{props.startTime}</td>
          <td>{props.status}</td>
          <td className='select-exam-radio-container'>
            <label className='select-exam-radio'>
              <input type="radio" name="examId" value={props.examId}/>
              <span>
                <i className='fas fa-check'></i>
              </span>
            </label>
          </td>
      </tr>
  )
}

export default ExamTableRow