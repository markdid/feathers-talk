import React, {Component} from 'react';
import client from '../feathers';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    updateField(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleLogin(){
        const {email, password} = this.state;
        console.log("processing");
        return client.authenticate({
            strategy: 'local',
            email, password
        }).catch(error => this.setState({ error }));
    }

    handleSignup(){
        const {email, password} = this.state;
        return client.service('users').create({email, password})
            .then(() => this.handleLogin());
    }

    render() {
        return (
            <div>
                <p>{this.state.error && this.state.error.message}</p>
                <form>
                    <input type="email" name="email" placeholder="email" onChange={event => this.updateField(event)}></input>
                    <input type="password" name="password" placeholder="password" onChange={event => this.updateField(event)}></input>
                    <button type="button" id="login" onClick={() => this.handleLogin()}>Log in</button>
                    <button type="button" id="signup" onClick={() => this.handleSignup()}>Sign up</button>
                </form>

            </div>
        );
    }
}

export default Login;