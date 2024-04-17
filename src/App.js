import React, { Suspense } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Redirect, Route, Switch} from "react-router-dom";
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/login/Login';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Preloader from './components/common/preloader/Preloader';
import store from "./redux/redux-store";
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import { withSuspense } from './hoc/withSuspense';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

class App extends React.Component {

       catchAllUnhandledErrors = (promiseRejectionEvent) => {
              alert(promiseRejectionEvent);
              //add dispatch
       }

       componentDidMount() {
              this.props.initializeApp();
              window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
       }

       componentWillUnmount() {
              window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
       }
      
       render() {
              if (!this.props.initialized) return <Preloader />
              
              return (
                     <div className='app-wrapper'>
                         <HeaderContainer />
                         <Navbar />
                         <div className='app-wrapper-content'>
                            <Switch>
                             <Route exact path='/'
                                    render={() => <Redirect to={'/profile'} />}/>

                             <Route path='/dialogs'
                                    render={withSuspense(DialogsContainer)}/>
         
                             <Route path='/profile/:userId?'
                                    render={withSuspense(ProfileContainer)}/>
         
                             <Route path='/users'
                                    render={ () => <UsersContainer pageTitle='Hello World' /> }/>
         
                             <Route path='/login'
                                    render={ () => <Login /> }/>

                            <Route path='*'
                                    render={ () => <div>404 NOT FOUND</div> }/>

                            </Switch>
                         </div>
                     </div>
                 )
              }
}

const mapStateToProps = (state) => ({
       initialized: state.app.initialized
})

let AppContainer = compose(
       withRouter,
       connect(mapStateToProps, {initializeApp}))(App);

const SamuraiJSApp = (props) => {
       return <BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
}

export default SamuraiJSApp