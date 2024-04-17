import { FormAction, stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { ProfileAPI, ResultCodeEnum, UsersAPI } from "../api/api";
import { PostsType, ProfilePhotosType, ProfileType } from "../types/types";
import { AppStateType } from "./redux-store";

const ADD_POST = 'ADD-POST';
// const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE ';
const SET_USER_STATUS = 'SET_USER_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';


let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: "" as string,
    newPostText: "" as string
}

export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case ADD_POST : {
            let newPost = {
                id: 5,
                message: action.message,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: '',
            }
        }
        // case UPDATE_NEW_POST_TEXT : {
        //     return {
        //         ...state,
        //         newPostText: action.newText,
        //     };
        // }
        case SET_USER_PROFILE : {
            return {
                ...state,
                profile: action.profile,
            };
        }
        case SET_USER_STATUS : {
            return {
                ...state,
                status: action.status,
            };
        }
        case SAVE_PHOTO_SUCCESS : {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            };
        }
        default: 
            return state
    }
}

type ActionsTypes = AddPostActionCreatorType | SetUserProfileType | SetUserStatusType | SavePhotoSuccessType

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes | FormAction>

export const getProfile = (id: number | null): ThunkType => async (dispatch) => {
    const data = await ProfileAPI.getUserProfile(id);
    dispatch(setUserProfile(data)); 
}


export const getUserStatus = (id: number | null): ThunkType => async (dispatch) => {
    const response = await ProfileAPI.getStatus(id);
    dispatch(setUserStatus(response.data));
}

export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
    const response = await ProfileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status));
    }
}

export const savePhoto = (file: ProfilePhotosType) => async (dispatch: any) => {
    const response = await ProfileAPI.savePhotoFile(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const response = await ProfileAPI.saveProfileChange(profile);
    if (response.data.resultCode === ResultCodeEnum.Success) {
        dispatch(getProfile(userId));
    } else {
        dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}))
        return Promise.reject(response.data.messages[0])
    }
}

type AddPostActionCreatorType = {
    type: typeof ADD_POST
    message: string
}

type SetUserProfileType = {
    type: typeof SET_USER_PROFILE 
    profile: ProfileType
}

type SetUserStatusType = {
    type: typeof SET_USER_STATUS
    status: string
}

type SavePhotoSuccessType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: ProfilePhotosType
}

export const addPostActionCreator = (message: string): AddPostActionCreatorType => ({type: ADD_POST, message: message})
// export const updateNewPostTextActionCreator = (text) => ({type: UPDATE_NEW_POST_TEXT, newText: text })
export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({type: SET_USER_PROFILE, profile})
export const setUserStatus = (status: string): SetUserStatusType => ({type: SET_USER_STATUS, status})
export const savePhotoSuccess = (photos: ProfilePhotosType) => ({type: SAVE_PHOTO_SUCCESS, photos})

export default profileReducer