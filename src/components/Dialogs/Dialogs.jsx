import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { Textarea } from '../common/FormsControls/FormsControls';

const maxLength = maxLengthCreator(30)

const DialogsForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
                <div><Field component={Textarea} name='message'
                            placeholder='Enter your message'
                            validate={[required, maxLength]}/></div>
                <div><button type='submit'>Send</button></div>
            </form>
}

const DialogsReduxForm = reduxForm({form: 'dialogs'})(DialogsForm)

const Dialogs = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map( d => <DialogItem name={d.name} key={d.id} id={d.id} />  );
    let messagesElements = state.messages.map( m => <Message message={m.message} key={m.id} /> );
    let newMessageBody = state.newMessageBody;

    // let onSendMessageClick = () => {
    //     props.sendMessage()
    // }

    // let onNewMessageChange = (e) => {
    //     let body = e.target.value;
    //     props.updateNewMessageBody(body)
    // }

    const onSubmit = (formData) => {
        props.sendMessage(formData.message)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                { dialogsElements }
            </div>
            <div className={s.messages}>
                <div>{ messagesElements }</div>
                <div>
                    <DialogsReduxForm onSubmit={onSubmit}  />
                </div>
            </div>
        </div>
    )
}

export default Dialogs;

// <form>
//                 <div><textarea value={newMessageBody} 
//                                 onChange={onNewMessageChange}
//                                 placeholder='Enter your message'/></div>
//                 <div><button onClick={onSendMessageClick}>Send</button></div>
//             </form>