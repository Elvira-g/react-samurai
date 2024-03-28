import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

let Users = ({totalUsersCount, pageSize, currentPage, onPageChanged, users, followingInProgress, followUser, unfollowUser, ...props}) => {
    return (<div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalUsersCount} pageSize={pageSize}/>
        {users.map(user => <User user={user} followingInProgress={followingInProgress} followUser={followUser} unfollowUser={unfollowUser} key={user.id}/>)}
        </div>)
}

export default Users

//  <button onClick={(e) => onFollowClick(e,user.id)}>{user.followed === true ? 'Follow' : 'Unfollow'}</button>
// let onFollowClick = (e,id) => {
//     if (e.target.innerText === 'Follow') {
//         props.toggleFollowingProgress(true)
//         axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${id}`, {
//         withCredentials: true,
//         headers: {'API-KEY': 'sfsdfs-asdfasd-adsfasd-dafas'}
//         }).then(response => {
//             if (response.data.resultCode === 0) {
//                 props.unfollow(id);
//                 e.target.innerText = 'Unfollow';
//             }
//             props.toggleFollowingProgress(false)
//         })
//     } else if (e.target.innerText === 'Unfollow') {
//         props.toggleFollowingProgress(true)
//         axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${id}`, {}, {
//         withCredentials: true,
//         headers: {'API-KEY': 'sfsdfs-asdfasd-adsfasd-dafas'}
//         }).then(response => {
//             if (response.data.resultCode === 0) {
//                 props.follow(id);
//                 e.target.innerText = 'Follow';
//             }
//             props.toggleFollowingProgress(false)
//         })
//     }
// }