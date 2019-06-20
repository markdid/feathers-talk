import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Login from './components/login';
import Chat from './components/chat';
import client from './feathers';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        login: null,
        liveUsers: 0
    };
  }

  componentDidMount() {
      const messages = client.service('messages');
      const users = client.service('users');
      const live = client.service('sockets');

      client.authenticate().catch(() => this.setState({ login: null }));

      client.on('connection', connection => {
          console.log(connection);
      });
      //logged in
      client.on('authenticated', login => {

          Promise.all([
              messages.find({
                  query: {
                      $sort: {createdAt: -1},
                      $limit: 25
                  }
              }),
              users.find(),
              live.find()
          ]).then( ([ messagePage, userPage, live]) => {

              const messages = messagePage.data.reverse();
              const users = userPage.data;
              const liveUsers = live;
              console.log(liveUsers);
              // localStorage.debug = '*'; //socket io debugging
              this.setState({ login, messages, users })
          });
      });

      //logout
      client.on('logout', () => this.setState({
          login: null,
          messages: null,
          users: null
      }));


      messages.on('created', message => this.setState({
          messages: this.state.messages.concat(message)
      }));

      users.on('created', user => this.setState({
          users: this.state.users.concat(user)
      }));

      client.on('userCount', data => {
          console.log("here");
         console.log(data.userCount);
      });
  }


    render() {
      if(this.state.login === undefined) {
          return <div>
              <h1>loading...?</h1>
          </div>
      } else if(this.state.login) {
          return <Chat messages={this.state.messages} users={this.state.users}/>
      }
    return (
        <div>
          <Login />
        </div>
    );
  }
}

export default App;
