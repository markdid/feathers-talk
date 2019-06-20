import React, {Component} from 'react';
import moment from 'moment';
import client from '../feathers';

class Chat extends Component {

    sendMessage(event) {
        const input = event.target.querySelector('[name="text"]');
        const text = input.value.trim();

        if(text) {
            client.service('messages').create({ text }).then(() => {
                input.value = '';
            });
        }
        event.preventDefault();
    }

    // componentDidMount() {
    //     client.service('meessages').on('created');
    //     // this.scrollToBottom();
    // }
    //
    // componentWillUnmount() {
    //     client.service('messages').removeListener('created');
    // }

    render() {
        const { users, messages } = this.props;

        return (
            <div className="flex flex-column">
                <header className="title-bar flex flex-row flex-center">
                    <div className="title-wrapper block center-element">
                        {/*<span className="title">{user.context}</span>*/}
                        <span className="title">Chat</span>
                    </div>
                </header>

                {/*sidebar*/}
                <div className="flex flex-row flex-1 clear">
                    <div className="sidebar col col-3 flex flex-column flex-space-between">
                    {/*<span className="absolute username">{users.length()}</span>*/}
                        <ul className="flex flex-column flex-1 list-unstyled user-list">
                            {users.map(user => <li key={user._id}>
                                <a className="block relative" href="#">
                                    {/*<img src={user.avatar} alt={user.email} className="avatar" />*/}
                                    {user.email}
                                </a>
                            </li>)}
                        </ul>
                        <footer className="flex flex-row flex-center">
                            <a href="#logout" onClick={() => client.logout()}>
                                Sign Out
                            </a>
                        </footer>

                    </div>
                </div>

            {/*    main section*/}
                <div className="flex flex-column col col-9">
                    <div className="chat flex flex-column flex-1 clear" ref={main => { this.chat = main; }}>
                    {messages.map(message =>
                        <div className="message" key={message._id}>
                            <p className="message-header">
                                <span className="username font-600">{message.user.email} - </span>
                                <span className="sent-date font-300">{moment(message.createdAt).format('MMM Do, hh:mm:ss')}</span>
                            </p>
                            <p className="message-content font-300">{message.text}</p>
                        </div>
                    )}
                    </div>

                    <form onSubmit={this.sendMessage.bind(this)} className="flex flex-row flex-space-between" id="send-message">
                        <input type="text" name="text" className="flex flex-1" />
                        <button className="button-primary" type="submit">Send</button>
                    </form>
                </div>

            </div>
        );
    }
}

export default Chat;