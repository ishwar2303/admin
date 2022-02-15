import React from 'react';
import { useState, useEffect } from 'react';
import Timer from './services/Timer';
import './services/css/Timer.css';

function TimerComponent(props) {
    const [time, setTime] = useState(props.time);
    let id = 'timer-' + parseInt(Math.pow(10, 15)*Math.random());
    useEffect(() => {
        setTime(props.time);
        let timer = new Timer();
        timer.set(time, id, props.callback);

        timer.start(props.type);
    }, []);

    useEffect(() => {
        let timer = new Timer();
        timer.set(time, id, props.callback);
        timer.start(props.type);
    }, [props.time]);

    return (
        <div className='timer'>
            <div id={id}></div>
        </div>
    );
}

export default TimerComponent;