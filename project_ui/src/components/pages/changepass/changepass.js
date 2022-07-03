import React from 'react'
import './changepass.css'
import {simpleService} from '../../../services/simpleService'
import userService from '../../../services/userService'
import hash from '../../../services/passwordService'

class Changepass extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            checkclasses: 'check red',
            pass: ''
        }
        this.checkpass = this.checkpass.bind(this)
        this.changepass = this.changepass.bind(this)
    }
    checkpass(event) {
        if(this.state.pass == event.target.value)
            this.setState({checkclasses: 'check green'})
        else 
            this.setState({checkclasses: 'check red'})
    }
    async changepass() {
        let service = new userService()
        if(await service.changepassword(this.state.pass) == true)
            document.location.href = '/'
    }
    render() {
        return(
            <div className='flex'>
                <div className='main'>
                    <div className='line'>
                        <input className='inp' type="password" placeholder='Password' 
                                onChange={event => this.setState({pass: event.target.value})}></input>
                    </div>
                    <div className='line flex'>
                        <input className='inp' type="password" placeholder='Conform password' 
                                onChange={event => this.checkpass(event)}></input>
                        <div className={this.state.checkclasses}></div>
                    </div>
                    <div>
                        <button className='btn1' onClick={() => this.changepass()}>Change</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Changepass