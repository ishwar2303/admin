import React from 'react'
import { useState, useEffect } from 'react';
import TimerComponent from './TimerComponent';

function WorkingOfTimer() {

    const [questionTimer, setQuestionTimer] = useState(10800);

    const callback = () => {
        console.log('callback run');
    }

    return (
        <>
            <div className='flex-row p-20'>
                <TimerComponent time={questionTimer} callback={callback} type={'COUNT_DOWN'} />
                <TimerComponent time={questionTimer} callback={callback} type={'COUNT_UP'} />
            </div>
        </>
    );
}

export default WorkingOfTimer