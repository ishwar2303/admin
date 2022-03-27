import React from 'react'
import ExamActionButtons from '../buttons/ExamActionButtons'

function ExamTableRow(props) {
  return (
      <tr>
          <td>{props.serialNo}</td>
          <td>{props.title}</td>
          <td>{props.visibility}</td>
          <td>{props.startTime}</td>
          <td>{props.endTime}</td>
          <td>{props.status}</td>
          <td>
              <ExamActionButtons />
          </td>
      </tr>
  )
}

export default ExamTableRow