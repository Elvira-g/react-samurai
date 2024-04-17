import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ProfileType } from '../types/types';

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

    unfollowUser(id: number) {
        return instance.delete(`follow/${id}`).then(response => response.data)
    },

    followUser(id: number) {
        return instance.post(`follow/${id}`).then(response => response.data)
    },

    getUserProfile(id: number) {
        console.warn('Use ProfileAPI object')
        return ProfileAPI.getUserProfile(id)
    }

}

type GetUserProfileType = {
    resultCode: ResultCodeEnum
    messages: Array<string>,
    data: {id: number | null}
}

type SavePhotoType = {
    resultCode: ResultCodeEnum
    messages: Array<string>,
    data: {small: string, large: string}
}

type SaveProfileChangeType = {
    resultCode: ResultCodeEnum
    messages: Array<string>,
    profile: ProfileType
}

export const ProfileAPI = {
    getUserProfile(id: number | null) {
        return instance.get(`profile/${id}`).then(response => response.data)
    },
    getStatus(id: number | null) {
        return instance.get(`profile/status/${id}`)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`,{status: status})
    },
    savePhotoFile(file: any) {
        const formData = new FormData();
        formData.append('image', file)
        return instance.put(`profile/photo`,formData, {
            'Content-Type': 'multipart/form-data'
        })
    },
    saveProfileChange(profile: ProfileType) {
        return instance.put(`profile`, profile)
    }
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

type authMeType = {
    data: {id: number, email: string, login: string}
    resultCode: ResultCodeEnum 
    messages: Array<string>
}

type LoginType = {
    resultCode: ResultCodeEnum | ResultCodeForCaptcha
    messages: Array<string>,
    data: {
      userId: number
    }
}

// type LogoutType = {
//     resultCode: ResultCodeEnum
//     messages: Array<string>
// }

export const authAPI = {
    authMe() {
        return instance.get<authMeType>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginType>(`auth/login`, {email, password, rememberMe, captcha})
        .then(res => res.data)
    },
    logout() {
        return instance.delete(`auth/login`)
    },
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    },
}
