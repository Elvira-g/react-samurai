
import { ThunkAction } from 'redux-thunk';
import { getAuthUserData } from './auth-reducer'
import { AppStateType } from './redux-store';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

type InitializeSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export type InitializeStateType = {
    initialized: boolean
}

let initialState: InitializeStateType = {
    initialized: false,
}

type ActionsTypes = InitializeSuccessActionType

const appReducer = (state = initialState, action: ActionsTypes): InitializeStateType => {
    switch(action.type) {
        case INITIALIZED_SUCCESS :
            return {
                ...state,
                initialized: true,
            }
        default: 
            return state
    }
}

export const initializedSuccess = (): InitializeSuccessActionType => ({type: INITIALIZED_SUCCESS})

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>

export const initializeApp = (): ThunkType => (dispatch) => {
    dispatch(getAuthUserData())
    .then(() => {
        dispatch(initializedSuccess())
    })
     //let promise = dispatch(getAuthUserData())
    //Promise.all([promise]).then()
}


export default appReducer