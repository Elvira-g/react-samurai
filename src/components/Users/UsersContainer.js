import React from 'react'
import { connect } from 'react-redux';
import { setPageNumber, 
    setUsers, 
    toggleFollowingProgress, 
    getUsers, 
    unfollowUser, 
    followUser } from '../../redux/users-reducer'
import Users from './Users';
import Preloader from '../common/preloader/Preloader';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { getUsersList, getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount } from '../../redux/users-selectors';

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage,this.props.pageSize)
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber,this.props.pageSize)

    }

    render() {
        return <div>
            {this.props.isFetching ? <Preloader/>: null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize} 
                currentPage={this.props.currentPage}
                users={this.props.users} 
                onPageChanged={this.onPageChanged}
                unfollowUser={this.props.unfollowUser}
                followUser={this.props.followUser} 
                followingInProgress = {this.props.followingInProgress}
            />
        </div>
    }
}


let mapStateToProps = (state) => {
    return {
        users: getUsersList(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress,
//     }
// }

// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId))
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowAC(userId))
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage: (pageNumber) => {
//             dispatch(setPageNumberAC(pageNumber))
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setTotalUsersCountAC(totalCount))
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(toggleIsFetchingsAC(isFetching))
//         }
//     }
// }



export default compose(
        // withAuthRedirect,
        connect(mapStateToProps,{
            followUser,
            unfollowUser,
            setUsers,
            setPageNumber,
            toggleFollowingProgress,
            getUsers,
        }))(UsersContainer)