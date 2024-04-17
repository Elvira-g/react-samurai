import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { UsersAPI } from '../api/api';
import { ProfilePhotosType, UserType } from '../types/types';
import { updateObjectInArray } from '../utils/object-helpers';
import { AppStateType } from './redux-store';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLOWWING_PROGRESS = 'TOGGLE_IS_FOLOWWING_PROGRESS';


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>,
}

export type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case FOLLOW :
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true} )
                // state.users.map( u => u.id === action.userId ? {...u, followed: true} : u ),
            }
        case UNFOLLOW :
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false} )
            }
        case SET_USERS :
            return {...state, users: action.users }
        case SET_CURRENT_PAGE :
            return {...state, currentPage: action.currentPage }
        case SET_TOTAL_USERS_COUNT :
            return {...state, totalUsersCount: action.totalUsersCount }
        case TOGGLE_IS_FETCHING :
            return {...state, isFetching: action.isFetching }
        case TOGGLE_IS_FOLOWWING_PROGRESS :
            return {...state, 
                followingInProgress: action.isFetching 
                ? [...state.followingInProgress,action.userId]
                : state.followingInProgress.filter(id => id != action.userId)}
        default: 
            return state
    }
}

type ActionsTypes = FollowSuccessType | UnfollowSuccessType | SetUsersType | SetPageNumberType | SetTotalUsersCountType | ToggleIsFetchingType | ToggleFollowingProgressType

type FollowSuccessType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId: number): FollowSuccessType => ({type: FOLLOW, userId: userId})

type UnfollowSuccessType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessType => ({type: UNFOLLOW, userId: userId })

type SetUsersType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersType => ({type: SET_USERS, users: users })

type SetPageNumberType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}
export const setPageNumber = (currentPage: number): SetPageNumberType => ({type: SET_CURRENT_PAGE, currentPage: currentPage })

type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalUsersCount: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountType => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount: totalUsersCount })

type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING 
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => ({type: TOGGLE_IS_FETCHING, isFetching })

type ToggleFollowingProgressType = {
    type: typeof TOGGLE_IS_FOLOWWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressType => ({type: TOGGLE_IS_FOLOWWING_PROGRESS, isFetching, userId })

type DispatchType = Dispatch<ActionsTypes>

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
export const getUsers = (currentPage: number,pageSize: number):ThunkType => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setPageNumber(currentPage))
    const data = await UsersAPI.getUsers(currentPage, pageSize);
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
    dispatch(toggleIsFetching(false));
}

const followUnfollowFlow = async (dispatch: DispatchType, 
                                userId: number, 
                                apiMethod: any, 
                                actionCreator: (userId: number) => FollowSuccessType | UnfollowSuccessType) => {
    dispatch(toggleFollowingProgress(true, userId));
    const data = await apiMethod(userId);
    if(data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId));
}

export const followUser = (userId: number): ThunkType  => { 
    return async (dispatch ) => {
        followUnfollowFlow(dispatch, userId, UsersAPI.followUser.bind(userId), followSuccess)
    }    
}

export const unfollowUser = (userId: number): ThunkType => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, UsersAPI.unfollowUser.bind(userId), unfollowSuccess)
    }
}


export default usersReducer