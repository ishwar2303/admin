import React from 'react';
import Request from './services/Request';
import LoaderHeading from './util/LoaderHeading';

function Profile(props) {
    const resetForm = () => {
        document.getElementById('profile-form').reset();
    }

    const updateProfile = (e) => {
        e.preventDefault();
        console.log('submit');
    }
    return (
    <>
        <LoaderHeading 
            description='Profile'
        />
        <div className='content-loaded'>
            <div>
                <form id="profile-form" onSubmit={updateProfile}>
                    <div className="input-block">
                        <div className="input-floating">
                            <input type="text" defaultValue={props.admin.fullName} required/>
                            <label>Full Name</label>
                        </div>
                    </div>
                    <div className="input-block">
                        <div className="input-floating">
                            <input type="email" defaultValue={props.admin.email} required disabled/>
                            <label>E-mail</label>
                        </div>
                        <div className="input-floating">
                            <input type="number" defaultValue={props.admin.contact} required />
                            <label>Contact</label>
                        </div>
                    </div>
                    <div className='flex-row jc-sb mt-10'>
                        <div className='btn btn-fade btn-small' onClick={resetForm}>Reset</div>
                        <button className='btn btn-secondary btn-small'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    </>
    );
}

export default Profile;
