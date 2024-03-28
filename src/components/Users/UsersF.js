import React from 'react';
import s from './Users.module.css';
import * as axios from 'axios'

const Users = (props) => {

    let getUsers = () => {
        if (props.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                props.setUsers(response.data.items)
            })
        }
    }
  
    let onFollowClick = (e,id) => {
        if (e.target.innerText === 'Follow') {
            props.unfollow(id);
            e.target.innerText = 'Unfollow'
        } else if (e.target.innerText === 'Unfollow') {
            props.follow(id);
            e.target.innerText = 'Follow'
        }
    }

    return (<div>
        <button onClick={getUsers}>Get users</button>
        {
            props.users.map(user => <div className={s.userCard} key={user.id}>
                        <div>
                            <img src={user.photos.small ? user.photos.small : 'https://syrboyi.kz/wp-content/uploads/2020/07/kisspng-question-mark-questions-5b4e9adc353a96.979878161531878108218-768x683.jpg'} className={s.img} />
                        </div>
                        <div>Name: {user.name}</div>
                        <button onClick={(e) => onFollowClick(e,user.id)}>{user.followed === true ? 'Follow' : 'Unfollow'}</button>
                        <div>Status: {user.status}</div>
                        {user.location && user.location.city && <div>City: {user.location.city}</div>}
                        {user.location && user.location.country && <div>Country: {user.location.country}</div>}
                        
                    </div>
            )
        }
        </div>)
}

export default Users