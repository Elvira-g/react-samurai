import { FormAction, stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { authAPI, ResultCodeEnum, ResultCodeForCaptcha, securityAPI } from "../api/api";
import { AppStateType } from "./redux-store";

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

// export type InitialStateType2 = {
//     userId: number | null,
//     email: string | null,
//     login: string | null,
//     isAuth: boolean,
//     captchaUrl: string | null ,
// }

type SetAuthUserDataPayloadType = {
    userId: number | null, 
    email: string | null,
    login: string | null, 
    isAuth: boolean
}


type GetAuthCaptchaUrlPayloadType = {
    captchaUrl: string
    
}

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
}

export type InitialStateType = typeof initialState;

type ActionsTypes = SetAuthUserDataType |  GetAuthCaptchaUrlType

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case SET_USER_DATA :
        case GET_CAPTCHA_URL_SUCCESS :
            return {
                ...state,
                ...action.payload,
            }
        default: 
            return state
    }
}

export type SetAuthUserDataType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataPayloadType
}
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataType => ({
    type: SET_USER_DATA, payload: 
        {userId, email, login, isAuth}
    })

export type GetAuthCaptchaUrlType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: GetAuthCaptchaUrlPayloadType
}
export const getAuthCaptchaUrl = (captchaUrl: string): GetAuthCaptchaUrlType => ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl} })


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes  | FormAction> 

export const getAuthUserData = ():ThunkType  => async (dispatch) => {
   const meData =  await authAPI.authMe()
    if (meData.resultCode === ResultCodeEnum.Success) {
        let {id, email, login} = meData.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememderMe: boolean, captcha: string | null): ThunkType => async (dispatch) => {
    const meData = await authAPI.login(email, password, rememderMe, captcha)
    if (meData.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserData())
    }  else {
        if (meData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        let message = meData.messages.length > 0 ? meData.messages[0] : "Some Error"
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url
    dispatch(getAuthCaptchaUrl(captchaUrl))
}

export const logout = (): ThunkType => async (dispatch) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === ResultCodeEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}


export default authReducer