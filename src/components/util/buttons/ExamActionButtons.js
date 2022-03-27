import React from 'react'
import '../../css/ExamActionButtons.css';
function ExamActionButtons() {
  return (
    <div className='flex-row exam-action-buttons jc-c'>
        <button>
            <i className='fas fa-pen'></i>
        </button>
        <button>
            <i className='fas fa-trash'></i>
        </button>
    </div>
  )
}

export default ExamActionButtons