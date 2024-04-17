import React from 'react';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { createField, Input } from '../common/FormsControls/FormsControls';
import { login } from '../../redux/auth-reducer'
import { Redirect } from 'react-router';
import s from '../common/FormsControls/FormsControls.module.css'
import { AppStateType } from '../../redux/redux-store';

const maxLength = maxLengthCreator(30)

type LoginFormOwnPropsType = {
    captchaUrl: string | null
}
const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
                {createField<LoginFormValuesTypesKeys>("Email", "email", [required, maxLength], Input)}
                {createField<LoginFormValuesTypesKeys>("Password", "password", [required], Input, {type: 'password'})}
                {createField<LoginFormValuesTypesKeys>(undefined, "rememberMe",[], Input, {type: 'checkbox'}, 'remember me')}

                {captchaUrl && <img src={captchaUrl} />}
                {captchaUrl && createField<LoginFormValuesTypesKeys>("Symbols from image", "captcha", [required], Input)}

            {error && <div className={s.formError}>
            {error}
            </div>
            }
            <div>
                <button type='submit'>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType>({form: 'login'})(LoginForm)


type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememderMe: boolean, captcha: string) => void
}

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormValuesTypesKeys = Extract<keyof LoginFormValuesType, string>

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if(props.isAuth) {
        return <Redirect to={'/profile'} />
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login)