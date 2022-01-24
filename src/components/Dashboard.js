import React from 'react';
import LoaderHeading from './util/LoaderHeading';

function Dashboard() {
    return (
        <>
            <LoaderHeading 
                description='Dashboard'
            />
            <div className='content-loaded'>
                <div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
