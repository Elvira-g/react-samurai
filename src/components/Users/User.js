import React from 'react';
import NavLink from 'react-router-dom/NavLink';
import s from './Users.module.css';

let User = ({user, followingInProgress, followUser, unfollowUser, ...props}) => {
    return (<div className={s.userCard}>
                <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small ? user.photos.small : 'https://syrboyi.kz/wp-content/uploads/2020/07/kisspng-question-mark-questions-5b4e9adc353a96.979878161531878108218-768x683.jpg'} className={s.img} />
                </NavLink>
                <div>Name: {user.name}</div>
                <div>
                    {user.followed
                        ? <button disabled={followingInProgress
                            .some(id => id === user.id) } 
                                onClick={()=> { unfollowUser(user.id) }}>
                            Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id) } 
                            onClick={() => { followUser(user.id) }}>
                            Follow</button>}
                </div>
                <div>Status: {user.status}</div>
                {user.location && user.location.city && <div>City: {user.location.city}</div>}
                {user.location && user.location.country && <div>Country: {user.location.country}</div>}
            </div>)
}

export default User