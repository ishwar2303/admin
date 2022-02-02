import React from 'react';
import LoaderHeading from './util/LoaderHeading';

import './css/Settings.css';

function Settings() {
  return (
        <>
            <LoaderHeading 
                description='Settings'
            />
            <div className='content-loaded'>
                <div className='settings'>
                    <div>
                        <h3 className='heading'>General</h3>
                    </div>
                    <div>
                        <h3 className='heading'>Render</h3>
                        <h4>View Page</h4>
                        <div className='flex-col'>
                            <p>Number of exams per page</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Settings;
