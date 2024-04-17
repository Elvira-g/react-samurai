import React, { useState } from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileReduxForm from './ProfileDataForm';

const ProfileInfo = ({profile, ...props}) => {

    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected  = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
        props.saveProfile(formData).then(
            () => {
                setEditMode(false)
            }
        )
        
        
    }

    const activateEditMode = () => {
        setEditMode(true)
    }

    return (
            <div>
                {/*<div>
                    <img
                        src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350'/>
        </div>*/}
                <div className={s.descriptionBlock}>
                    <img className={s.photo} src={profile.photos.large || 'https://syrboyi.kz/wp-content/uploads/2020/07/kisspng-question-mark-questions-5b4e9adc353a96.979878161531878108218-768x683.jpg'} />
                    {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
                    <div className={s.statusBlock}><ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus} /></div>
                    
                    { editMode ? <ProfileReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit} /> 
                                : <ProfileData profile={profile} isOwner={props.isOwner} activateEditMode={activateEditMode}/> }
                </div>
            </div>
    ) 
    
}

const ProfileData = ({profile, isOwner, activateEditMode}) => {
    return <div>
        <div><b>{profile.fullName}</b></div>
        <div>{profile.aboutMe}</div>
        <div><b>Contacts</b></div>
        {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })}
        <div><b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}</div>
        <div><b>Description:</b> {profile.lookingForAJobDescription}</div>
        {isOwner && <button onClick={activateEditMode}>Edit</button>}
    </div>
}

const Contact = ({contactTitle, contactValue}) => {
    return <div> <b>{contactTitle}:</b> {contactValue}</div>
}

export default ProfileInfo;