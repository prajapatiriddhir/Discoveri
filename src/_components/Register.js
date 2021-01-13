import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../_actions';
import { status } from '../_constants';


class Register extends Component {
    constructor() {
        super();
        this.state = {
            name:'',
            email: '',
            password: '',
            // isSubmitted: false
        }
    }

    handleStateChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };


//    handleSubmit = (event) => {
//        event.preventDefault();
//        const {name,email,password} = this.state;

//        const sendData = {
//            name,
//            email,
//            password
//        }

//        this.props.dispatch(authActions.register(sendData))
//    }



  handleSubmit = (event) =>{
      event.preventDefault();

      const {name,email,password} = this.state;
    
      if (name == '') {
        alert('Please enter name');
      } else if (email == '' || password == '') {
        alert('Please enter email and password');
      } else {
        const sendData = {
            name,
            email,
            password
        }
        this.props.dispatch(authActions.register(sendData));
       ;
      }
     
  }
    

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.register_status !== this.props.register_status && this.props.register_status === status.SUCCESS) {
          this.props.navigation.navigate('SelectRoleScreen');
        }
      }
    

render(){
    const {name, email, password } = this.state;

    return(
        <>
        <form onSubmit={this. handleSubmit}>
            <label>Name</label>
            <input type="text"
            name="name"
            value={name} 
            onChange={this.handleStateChange}/>

            <label>Email</label>
            <input type="email"
            name="email"
            value={email}
            onChange={this.handleStateChange}/>


            <label>Password</label>
            <input type="password"
            name="password"
            value={password}
            onChange={this.handleStateChange}/>

            <button>Register</button>
        </form>
        </>
    )
}  

}

function mapStateToProps(state) {
    const { user_login_status, user } = state.auth;
    return {
        user_login_status,
        user
    };
}

const connectedRegister = connect(mapStateToProps)(Register);
export default (connectedRegister);
