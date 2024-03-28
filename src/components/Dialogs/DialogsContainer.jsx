import React from 'react';
import { sendMessageCreator } from '../../redux/dialogs-reduser.js';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect.js';
import { compose } from 'redux';

// const DialogsContainer = (props) => {

//     let state = props.store.getState().dialogsPage;

//     let onSendMessageClick = () => {
//         props.store.dispatch(sendMessageCreator())
//     }

//     let onNewMessageChange = (body) => {
//         props.store.dispatch(updateNewMessageBodyCreator(body))
//     }

//     return (
//         <Dialogs updateNewMessageBody={onNewMessageChange} sendMessage={onSendMessageClick} dialogsPage={state} />
//     )
// }

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        // isAuth: state.auth.isAuth
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        // updateNewMessageBody: (body) => {
        //     dispatch(updateNewMessageBodyCreator(body))
        // },
        sendMessage: (newMessageBody) => {
            dispatch(sendMessageCreator(newMessageBody))
        }
    }
}


// let AuthRedirectComponent = withAuthRedirect(Dialogs);

// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);