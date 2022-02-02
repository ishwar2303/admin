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
                        <div className="input-container-bb">
                            <input type="text" defaultValue={props.admin.firstName} />
                            <label>First Name</label>
                        </div>
                        <div className="input-container-bb">
                            <input type="text" defaultValue={props.admin.lastName} />
                            <label>Last Name</label>
                        </div>
                        <div className='customized-radio-sticky'>
                            <label>Difficulty Level</label>
                            <div>
                                <label className='flex-full'>
                                    <input type='radio' name='difficultyLevel' defaultValue='1' defaultChecked={props.admin.genderId == 1 ? true : false} />
                                    <span>Male</span>
                                </label>
                                <label className='flex-full'>
                                    <input type='radio' name='difficultyLevel' defaultValue='2' defaultChecked={props.admin.genderId == 2 ? true : false}/>
                                    <span>Female</span>
                                </label>
                                <label className='flex-full'>
                                    <input type='radio' name='difficultyLevel' defaultValue='3' defaultChecked={props.admin.genderId == 3 ? true : false}/>
                                    <span>Others</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="input-block">
                        <div className="input-container-bb">
                            <input type="email" defaultValue={props.admin.email} disabled/>
                            <label>E-mail</label>
                        </div>
                        <div className="input-container-bb">
                            <input type="number" defaultValue={props.admin.contact} />
                            <label>Contact</label>
                        </div>
                    </div>
                    <div className="input-block">
                        <div className="input-container-bb">
                            <input type="text" defaultValue={props.admin.institution} />
                            <label>Institution</label>
                        </div>
                        <div className="input-container-bb">
                            <input type="date" defaultValue={props.admin.dateOfBirth} />
                            <label>dateOfBirth</label>
                        </div>
                    </div>
                    <div className='flex-row jc-sb'>
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
