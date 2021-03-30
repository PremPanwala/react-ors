import React, { Component } from 'react'
//import { register } from './UserFunctions'
import swal from 'sweetalert';
import Navbar from './Navbar';
import {Helmet} from 'react-helmet';
//import './css/styles.css';
import icon from './register.png';
class Register extends Component {
  constructor() {
    super()
    this.state = {
      username:'',
      password:'',
      email:'',
      phoneno:''
    }


    //http://localhost:5000/demo/register
   // this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  create()
  {
      console.log(this.state);
      fetch('https://node-ors-server.herokuapp.com/demo/register',{
          method:"Post",
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify(this.state)
      }).then((result)=>{
          
          result.json().then((res)=>{
              console.log(res);
              if(res.driver==true)
              {
              
                swal("REGISTERED USER!!","YOU MIGHT HAVE ACCOUNT WITH US!! PLEASE TRY TO LOGIN","warning")
                .then((value) => {
                  window.location.replace(window.location.origin+"/Login");  });
              }
              else{
              //  alert("WELCOME TO OUR FAMILY!!")  
            
               swal("SIGN UP!!","PLEASE OK TO CONTINUE","success")
                  .then((value) => {
                    window.location.replace(window.location.origin+"/Login"); ;
                  });
            
               }
              
              
                
          })
       
      })     
  }
  

  /*onChange(e) {
    this.setState({ [e.target.name]: e.target.value,})
  }*/
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
    <h2 class="active"> Register </h2>
    

    <div class="fadeIn first">
      <img src={icon} id="icon"alt="User Icon" />
    </div>

    <form noValidate onSubmit={this.onSubmit}>
      <input type="text" id="login" className="fadeIn second" name="username" placeholder="Name" onChange={(event) => {this.setState({username: event.target.value })}}/>
      <input type="text" id="login" className="fadeIn second" name="phoneno" placeholder="Phone No." onChange={(event) => {this.setState({phoneno: event.target.value })}}/>
      <input type="text" id="login" className="fadeIn second" name="email" placeholder="Email ID" onChange={(event) => {this.setState({email: event.target.value })}}/>
      <input type="password" id="login" className="fadeIn second" name="password" placeholder="Password" onChange={(event) => {this.setState({password: event.target.value })}}/>
      

      
      
      <input type="submit" class="fadeIn fourth" value="Register"/>
    </form>

    

  </div>
</div>
        
        </div>


    )
  }
}

export default Register
