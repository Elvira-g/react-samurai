import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': 'd0638082-d4cb-497d-8342-fc69bd07577d'}
})

export const UsersAPI = {
    getUsers(currentPage=1, pageSize=10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },

    unfollowUser(id) {
        return instance.delete(`follow/${id}`).then(response => response.data)
    },

    followUser(id) {
        return instance.post(`follow/${id}`).then(response => response.data)
    },

    getUserProfile(id) {
        console.warn('Use ProfileAPI object')
        return ProfileAPI.getUserProfile(id)
    }

}

export const ProfileAPI = {
    getUserProfile(id) {
        return instance.get(`profile/${id}`).then(response => response.data)
    },
    getStatus(id) {
        return instance.get(`profile/status/${id}`)
    },
    updateStatus(status) {
        return instance.put(`profile/status`,{status: status})
    }
}

export const authAPI = {
    authMe() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout() {
        return instance.delete(`auth/login`)
    },
}
