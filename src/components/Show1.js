import React, { Component } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { shadows } from '@material-ui/system';
var divStyle = {
  width:"40px"
};
// function sayHello(name) {
//   alert(`hello, ${name}`);
//    pid=`${name}`;   
// }

class Show1 extends Component {
  constructor(props) {
    super(props);
    var nam=null;
    if(localStorage.getItem("login"))
    {
      nam=localStorage.getItem("login");
    }
  this.state={
    oname:nam,
    lists:[],
    cid:'',
    pid:'',
    oid:'',
    name:'',
    email:'',
    phoneno:'',
    itemname:'',
    image:'',
    fine:'',
    
  };
  this.create();
}
      componentDidMount() {
       
        axios.post('https://node-ors-server.herokuapp.com/demo/show')
        .then(response => {
            this.setState({ lists: response.data.Users })
            console.log(this.state.lists)
          
        })
        .catch(error => {
          console.log(error);
        });
      }
     
     sayHello(name,oid,itemname,image,fine) {
      alert(`hello, ${oid}`);
      this.state.oid=`${oid}`;
      this.state.pid=`${name}`;
      this.state.itemname=`${itemname}`;
      this.state.image=`${image}`;
      this.state.fine=`${fine}`;
      this.disp();
        
    }
    disp()
    {
      console.log(this.state.cid);
      console.log(this.state.pid);
      console.log(this.state.name);
      console.log(this.state.phoneno);
      console.log(this.state.email);
      localStorage.setItem("cid", (this.state.cid))
      localStorage.setItem("pid", (this.state.pid))
      localStorage.setItem("name", (this.state.name))
      localStorage.setItem("phoneno", (this.state.phoneno))
      localStorage.setItem("email", (this.state.email))
      localStorage.setItem("oid", (this.state.oid))
      localStorage.setItem("itemname", (this.state.itemname))
      localStorage.setItem("image", (this.state.image))
      localStorage.setItem("fine", (this.state.fine))
      window.location.replace(window.location.origin+"/fbooking"); 
    }

  create(){
    console.log("hi bro"+this.state.oname);
    axios.post('https://node-ors-server.herokuapp.com/demo/show1/'+this.state.oname)
    .then(response => {
        console.log(response);
        console.log(response.data.Users._id);
        console.log(this.state.pid);
        this.setState({cid: response.data.Users._id});
        this.setState({name: response.data.Users.username});
        this.setState({email: response.data.Users.email});
        this.setState({phoneno: response.data.Users.phoneno});
        
        
    })
    .catch(error => {
      console.log(error);
    });
  }
    render() {
        
        return (
         
          <div className="container">
              
          <link rel="stylesheet" href="assets/css/rentShow.css"/>
 
             <div >
             {this.state.lists.map((details) => (
               <div style={{display: 'inline-block',margin:"20px"}}>
            
               <link rel="stylesheet" href="assets/css/rentShow.css"/>
        <figure class="card card-product-grid card-lg"> <a href="#" class="img-wrap" data-abc="true"> <img src={details.image}></img> </a>
            <figcaption class="info-wrap">
                <div class="row">
                    <div class="col-md-9 col-xs-9"> <a href="#" class="title" data-abc="true">Item Name:{details.itemname}</a> </div>
                    
                </div>
            </figcaption>
            <div class="bottom-wrap-payment">
                <figcaption class="info-wrap">
                    <div class="row">
                        <div class="col-md-9 col-xs-9"> <a href="#" class="title" data-abc="true">Description = {details.itemdetail}</a> </div>
                        <div class="col-md-9 col-xs-9"> <a href="#" class="title" data-abc="true">Price = ${details.rent}</a>  </div>
                        <div class="col-md-9 col-xs-9"> <a href="#" class="title" data-abc="true">Fine = ${details.fine}</a>  </div>
                        <div class="col-md-9 col-xs-9"> <a href="#" class="title" data-abc="true">Phone NO. = {details.phoneno}</a>  </div>
                        <div class="col-md-9 col-xs-9"> <a href="#" class="title" data-abc="true">Email = {details.email}</a>  </div>
                        
                        
                    </div>
                </figcaption>
            </div>
            <div class="bottom-wrap"> <Button className="btn btn-primary float-center" data-abc="true" onClick={() => this.sayHello(details._id,details.oid,details.itemname,details.image,details.fine)}> Buy now </Button>
              
            </div>
        </figure>
    </div>
             ))}
             </div>
            
 
            </div>


        )
      
    }
}

export default Show1;