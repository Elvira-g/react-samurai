import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { createField, Input } from '../common/FormsControls/FormsControls';
import { login } from '../../redux/auth-reducer'
import { Redirect } from 'react-router';
import s from '../common/FormsControls/FormsControls.module.css'

const maxLength = maxLengthCreator(30)
const LoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
                {createField("Email", "email", [required, maxLength], Input)}
                {createField("Password", "password", [required], Input, {type: 'password'})}
                {createField(null, "rememberMe",[], Input, {type: 'checkbox'}, 'remember me')}

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

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if(props.isAuth) {
        return <Redirect to={'/profile'} />
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login)