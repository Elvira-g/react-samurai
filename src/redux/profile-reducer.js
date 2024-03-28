import { ProfileAPI, UsersAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
// const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE ';
const SET_USER_STATUS = 'SET_USER_STATUS';

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ],
    profile: null,
    status: "",
}

const profileReducer = (state = initialState, action) => {
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
        default: 
            return state
    }
}

export const getProfile = (id) => async (dispatch) => {
    const data = await ProfileAPI.getUserProfile(id);
    dispatch(setUserProfile(data)); 
}


export const getUserStatus = (id) => async (dispatch) => {
    const response = await ProfileAPI.getStatus(id);
    dispatch(setUserStatus(response.data));
}

export const updateUserStatus = (status) => async (dispatch) => {
    const response = await ProfileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status));
    }
}

export const addPostActionCreator = (message) => ({type: ADD_POST, message: message})
// export const updateNewPostTextActionCreator = (text) => ({type: UPDATE_NEW_POST_TEXT, newText: text })
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setUserStatus = (status) => ({type: SET_USER_STATUS, status})

export default profileReducer