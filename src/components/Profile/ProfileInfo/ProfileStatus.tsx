import React, { ChangeEvent } from 'react';
import s from './ProfileInfo.module.css';

type PropsType = {
    status: string
    updateUserStatus: (status: string) => void
}

type StateType = {
    status: string
    editMode: boolean
}

class ProfileStatus extends React.Component<PropsType, StateType> {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState( {
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState( {
            editMode: false
        })
        this.props.updateUserStatus(this.state.status)
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState( {
            status: e.currentTarget.value
        })
       
    }

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if ( prevProps.status !== this.props.status) {
           this.setState({
                status: this.props.status
           }) 
        }
        
    }

    render() {
        return (
            <div>
            {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status || '----'}</span>
                </div>
            }
            {this.state.editMode &&
                <div>
                    <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status} />
                </div>
            }
            </div>
        ) 
    }
    
}
export default ProfileStatus;