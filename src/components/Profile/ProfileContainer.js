import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { setUserProfile, getProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile } from "../../redux/profile-reducer";
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.getProfile(userId)
        this.props.getUserStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }
        
    }

    render() {
        return (
            <div>
                <Profile {...this.props}
                        isOwner={!this.props.match.params.userId}
                        profile={this.props.profile} 
                        status={this.props.status} 
                        savePhoto={this.props.savePhoto}
                        saveProfile={this.props.saveProfile}
                        updateUserStatus={this.props.updateUserStatus} />
            </div>
        )
    }
   
}


// let authRedirectComponent = withAuthRedirect(ProfileContainer);

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

// let WithUrlDataContainerComponent =  withRouter(AuthRedirectComponent)

export default compose(
    connect (mapStateToProps,{setUserProfile, getProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile}),
    withRouter,
    // withAuthRedirect
)(ProfileContainer);