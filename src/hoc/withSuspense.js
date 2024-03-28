import React, { Suspense } from 'react';
import Preloader from '../components/common/preloader/Preloader';


// let mapStateToPropsForSuspense= (state) => ({
//     isAuth: state.auth.isAuth
// })

export const withSuspense= (Component) => {
    return (props) => { 
        return <Suspense fallback={<Preloader />}>
            <Component {...props} />
        </Suspense>
    }
    
}