
import React from 'react';
import $ from 'jquery'
function ExamForm() {

    const resetForm = () => {
        document.getElementById('exam-form').reset();
    }
    const showTimer = () => {
        document.getElementById('exam-timer').style.display = 'block';
    }
    const hideTimer = () => {
        document.getElementById('exam-timer').style.display = 'none';
    }
    const submitForm = (e) => {
        e.preventDefault();
        let formData = $('#exam-form').serialize();
        console.log(formData);
        let URL = 'http://localhost:8080/MajorProject/SubmitForm';
        $.ajax({
            url: URL,
            type: 'POST',
            data: formData,
            success: (msg) => {
                console.log('request fulfilled');
            },
            complete: (res) => {
                console.log(res.responseText);
            }
        })
    }
    return (
    <>
        <form action="">
            
      <div>
        <div className="form-floating mb-3">
          <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
          <label htmlFor="floatingPassword">Password</label>
        </div>
      </div>
        </form>
    </>
    );
}

export default ExamForm;
