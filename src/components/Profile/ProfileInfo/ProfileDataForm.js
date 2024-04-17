import React, { useState } from 'react';
import { createField, Input, Textarea } from '../../common/FormsControls/FormsControls';
import { Field, reduxForm } from 'redux-form';
import s from './ProfileInfo.module.css';

const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return <form className={s.formBlock} onSubmit={handleSubmit}>
        <div><b>{createField('Full Name', 'fullName', [], Input)}</b></div>
        <div>{createField('About Me', 'aboutMe', [], Textarea)}</div>
        <div><b>Contacts</b></div>
        {Object.keys(profile.contacts).map(key => {
            return <div key={key} className={s.profileCheckbox}>
                <b>{key}: {createField(key, 'contacts.' + key, [], Input)}</b>
            </div>
        })}
        <div className={s.profileCheckbox}><b>Looking for a job:</b> {createField('', 'lookingForAJob', [], Input, {type: 'checkbox'}, "yes")}</div>
        <div>{createField('Description about position', 'lookingForAJobDescription', [], Textarea)}</div>
        {error && <div className={s.error}>{error}</div>}
        
        <button>Save</button>
    </form>
}

const ProfileReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)

export default ProfileReduxForm
