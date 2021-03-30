import React, { Component } from 'react'
//import { login } from './UserFunctions'
import swal from 'sweetalert';
import Navbar from './Navbar';
import {Helmet} from 'react-helmet';
import icon from './icon.png';
//import './css/styles.css';
class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
     }

   // this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  /*onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }*/


  create()
  {
      //console.log(this.state);
      fetch('https://node-ors-server.herokuapp.com/demo/login',{
          method:"Post",
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify(this.state)
      }).then((result)=>{
          
          result.json().then((res)=>{
            console.log(res);
            //console.log(res.data.password);
            
            //console.log(res.data.email);
            
            //localStorage.setItem("login", (res.data.username));
            
              if(res.is_error==false)
              {
                localStorage.setItem("login", (res.data.email))
                swal("Successfully Logged In!!","Welcome Back","success")
                      .then((value) => {
                        window.location.replace(window.location.origin+"/dupload");  });
              }
              else{
                swal("CHECK YOUR EMAIL OR PASSWORD!!","INVALID EMAIL OR PASSWORD","warning")
                      .then((value) => {
                        window.location.replace(window.location.origin+"/Login"); });
              }
            //  console.log(res);
                  
          })
       
      })     
  }
  onSubmit(e) {
    e.preventDefault()
    console.log(this.state);
    this.create();
  }

  render() {
    return (
      <div>
      <Navbar/>
      
      <link rel="stylesheet" href="assets/css/lstyle.css"/>
        

      <div class="wrapper fadeInDown" style={{backgroundColor:'#56baed'}}>
  <div id="formContent">
    <h2 class="active"> Login</h2>
    

    <div class="fadeIn first">
      <img src={icon} id="icon"alt="User Icon" />
    </div>

    <form noValidate onSubmit={this.onSubmit}>
      <input type="text" id="login" className="fadeIn second" name="email" placeholder="Email ID" onChange={(event) => {this.setState({email: event.target.value })}}/>
      <input type="password" id="password" className="fadeInDown" name="password" placeholder="Password" onChange={(event) => {this.setState({password: event.target.value })}}
/>
      <input type="submit" class="fadeIn fourth" value="Log In"/>
    </form>

    <div id="formFooter">
     
    </div>

  </div>
</div>
        
        </div>
            )
  }
}

export default Login
