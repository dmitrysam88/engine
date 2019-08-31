import React, { Component } from 'react';
import { connect } from 'react-redux';

import usersModule from '../store/modules/users';
const userActions = usersModule.actions;

class App extends Component {

  addUser(){
    this.props.addUser({ name: this.refs.name.value, email: this.refs.email.value });
  }

  getUsers(){
    this.props.getUsers();
  }

  render(){
    // console.log(this.props.users);
    return(
      <div>
        <h1>My React App!</h1>
        <div>
          <label>Name</label>
          <input ref='name' type="text"/>
          <br/>
          <label>Email</label>
          <input ref='email' type="email"/>
          <br/>
          <button onClick={this.addUser.bind(this)}>Add user</button>
          <br/>
          <br />
          <button onClick={this.getUsers.bind(this)}>Load users</button>
        </div>
        <ul>
          {this.props.users.map((users, index)=>
            <li key={index}>
              <span>{index + 1} </span>
              <span>{users.name} </span>
              <span>{users.email} </span>
            </li>
          )}
        </ul>        
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    users: state.users.users
  }
}

export default connect(mapStateToProps, Object.assign({}, userActions))(App);