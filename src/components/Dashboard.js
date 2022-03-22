import React from 'react';
import WrapperHeader from './util/WrapperHeader';
import WrapperFooter from './util/WrapperFooter';
function Dashboard() {
    return (
        <>
            <WrapperHeader 
                heading='Dashboard'
            />
            <div className='content-loaded'>
                <div>
                </div>
            </div>
            <WrapperFooter />
        </>
    );
}

export default Dashboard;
