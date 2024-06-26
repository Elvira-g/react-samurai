import React from 'react';
import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = (props) => {

    return (
        <div>
            <ProfileInfo isOwner={props.isOwner} 
                        savePhoto={props.savePhoto} 
                        profile={props.profile} 
                        status={props.status} u
                        pdateUserStatus={props.updateUserStatus}
                        saveProfile={props.saveProfile} />
            <MyPostsContainer />
        </div>
    )
}

export default Profile;