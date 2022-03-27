import React from 'react'


function ExamTableRow(props) {
  return (
      <tr>
          <td>{props.serialNo}</td>
          <td>{props.title}</td>
          <td>{props.visibility}</td>
          <td>{props.startTime}</td>
          <td>{props.endTime}</td>
          <td>{props.status}</td>
      </tr>
  )
}

export default ExamTableRow