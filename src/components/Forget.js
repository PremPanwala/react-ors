import React, { Component } from 'react'
//import { login } from './UserFunctions'
import swal from 'sweetalert';
import {Helmet} from 'react-helmet';
import Navbar from './Navbar';
//import './css/styles.css';
import icon from './forget.png';
class Forget extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      
     }

   
    this.onSubmit = this.onSubmit.bind(this)
  }
  create()
  {
      console.log(this.state);
      fetch('https://node-ors-server.herokuapp.com/demo/forgot_pass',{
          method:"Post",
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify(this.state)
      }).then((result)=>{
          
          result.json().then((res)=>{
            console.log(res);
            if(res.is_error==false)
            {
            
            swal("Password Sent!!","PLEASE OK TO CONTINUE","success")
                  .then((value) => {
                    window.location.replace(window.location.origin + "/Login");  });
            }
           else
            {
            swal("Forgot Password Failed!!","PLEASE TRY AGAIN","warning")
                    .then((value) => {
                      window.location.replace(window.location.origin + "/Forget");  });
            }

          })
        
       
      })     
  }
  onSubmit(e) {
    e.preventDefault()
    swal({
      title: "Are you sure?",
      text: "Updated Password Will be sent to Your Registered E-mail Address!",
      icon: "warning",
      dangerMode: true,
      buttons: {
        cancel: "CANCEL",
        catch: {
          text: "SUBMIT",
          value: "catch",
        },
       
      },
    })    
    .then((value) => {
      switch (value) {
        case "catch":
          this.create();
          break;
     
        default:
          swal("Password Not Updated!");
      }
    });
        
    
    
   }

  render() {
    return (
      <div >
      <Navbar />
      <div style={{backgroundColor:'#56baed'}}>
      <link rel="stylesheet" href="assets/css/lstyle.css"/>
      
      <div class="wrapper fadeInDown" >
  <div id="formContent">
    <h2 class="active"> Forget Password</h2>
    

    <div class="fadeIn first">
      <img src={icon} id="icon"alt="User Icon" />
    </div>

    <form noValidate onSubmit={this.onSubmit}>
      <input type="text" id="login" className="fadeIn second" name="email" placeholder="Email ID" onChange={(event) => {this.setState({email: event.target.value })}}/>
      

      <input type="submit" class="fadeIn fourth" value="Log In"/>
    </form>

    
  </div>
</div>
</div>
        </div>

    )
  }
}

export default Forget
