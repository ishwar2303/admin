import React from 'react';
import {useState, useEffect} from 'react';

function ConvertTimeToString() {

    const [time, setTime] = useState(300);

    const convert = () => {
        let value = '';
        // Input is time in seconds
        // 1 hour = 60x60 = 3600 seconds
        let hours = parseInt(time/3600);
        let leftSeconds = time%3600;
        // 1 minute = 60 seconds
        let minutes = parseInt(leftSeconds/60);
        leftSeconds = leftSeconds%60;

        let seconds = leftSeconds;

        if(hours > 0) {
            if(hours == 1)
                value += "1 Hour ";
            else value += hours + " Hours "
        }

        if(minutes > 0) {
            if(minutes == 1)
                value += "1 Minute ";
            else value += minutes + " Minutes";
        }

        if(seconds > 0) {
            if(seconds == 1)
                value += "1 Second";
            else value += seconds + " Seconds";
        }

        document.getElementById('converted-value').innerText = value;
    }

    useEffect(() => {
        convert();
    }, []);

    return (
        <>
            <div className='p-20'>
                <div>Convert Time To String</div>
                <div id='converted-value'>
                    {time}
                </div>
            </div>
        </>
    )
}

export default ConvertTimeToString