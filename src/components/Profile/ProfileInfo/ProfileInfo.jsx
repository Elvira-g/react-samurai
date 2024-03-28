import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/preloader/Preloader';
import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = (props) => {

    if (!props.profile) {
        return <Preloader />
    } else {
        return (
            <div>
                {/*<div>
                    <img
                        src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350'/>
        </div>*/}
                <div className={s.descriptionBlock}>
                    <img src={props.profile.photos.large} />
                    <div>{props.profile.aboutMe}</div>
                    <div>gitHub: {props.profile.contacts.github}</div>
                </div>
                <div><ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus} /></div>
            </div>
        ) 
    }

    
}

export default ProfileInfo;