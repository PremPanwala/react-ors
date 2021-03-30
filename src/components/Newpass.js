import React, { Component } from 'react'
//import { login } from './UserFunctions'
import Navbar from './Navbar';
import icon from './reset.png'

class Newpass extends Component {
  constructor() {
    super()
    this.state = {
      password: ''
     }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()

    const user = {
      password: this.state.password
    }

  /*  login(user).then(res => {
      if (res) {
        this.props.history.push(`/profile`)
      }
    })*/
  }

  render() {
    
    return (
      <div>
      
      <Navbar />      
      <link rel="stylesheet" href="assets/css/lstyle.css"/>
        

      <div class="wrapper fadeInDown" style={{backgroundColor:'#56baed'}}>
  <div id="formContent">
    <h2 class="active"> Reset Password</h2>
    

    <div class="fadeIn first">
      <img src={icon} id="icon"alt="User Icon" />
    </div>

    <form noValidate onSubmit={this.onSubmit}>
      
    <input
                  type="text"
                  className="fadeIn Second"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />


      <input type="submit" class="fadeIn fourth" value="Reset Password"/>
    </form>

    <div id="formFooter">
     
    </div>

  </div>
</div>
        
        </div>

    )
  }
}

export default Newpass
