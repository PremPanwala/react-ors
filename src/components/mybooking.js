import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class mybooking extends Component {

    
    constructor() {
        super();
        this.state = {
          oid2:localStorage.getItem("oid"),
          lists: [],
          to:'',
          fine:1,
          total:1,
          _id:'',
          name:'',
          bill:'',
          phoneno:'',
          itemname:'',
          ffrom:'',
          email:'',

        };    
        this.onSubmit = this.onSubmit.bind(this)
      }
      onSubmit(e) {
        e.preventDefault()
      }
     
               
      
      
      componentWillMount() {
       
        axios.post('https://node-ors-server.herokuapp.com/demo/mybook/'+this.state.oid2)
        .then(response => {
            
             console.log(response.data.Users)
             this.setState({ lists: response.data.Users })

        
            // this.setState({name: response.data.Users[0].name});
            // this.setState({phoneno: response.data.Users[0].phoneno});
            // this.setState({ffrom: response.data.Users[0].from});
            // this.setState({itemname: response.data.Users[0].itemname});
            // this.setState({email: response.data.Users[0].email});
          
          
        })
        .catch(error => {
          console.log(error);
        });
      }
      //details.fine,details.to,details.total,details._id,details.email,details.from,details.itemname,details.name,details.phoneno
      sayHello(fine,to,total,_id,email,from,itemname,name,phoneno) {
        let f=0;
        alert(`hello, ${to}`);
        alert(`hello, ${from}`);
        this.state.to=`${to}`;
        this.state.fine=`${fine}`;
        this.state.total=`${total}`;
        this.state._id=`${_id}`;
        this.state.email=`${email}`;
        this.state.ffrom=`${from}`;
        this.state.itemname=`${itemname}`;
        this.state.name=`${name}`;
        this.state.phoneno=`${phoneno}`;
        var tempDate = new Date();
        var date = tempDate.getFullYear()+"-" + (tempDate.getMonth()+1) +"-"+ tempDate.getDate();
        const currDate = date;
        this.state.from=currDate;
        console.log(currDate);
        console.log(this.state.to);
        var diffInMs   = new Date(this.state.from) - new Date(this.state.to)
        var diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        console.log(Math.round(diffInDays));
        var now = new Date;
        var target = new Date(this.state.to);
    
        if ( now.getFullYear()>target.getFullYear() ) 
        {
            f=1;
            console.log("AFTER YEAR");
            let fi=(Math.round(diffInDays)*this.state.fine);
            this.state.fine=parseInt((Math.round(diffInDays)*this.state.fine));
            console.log(this.state.fine);
            console.log(+this.state.total+ +this.state.fine);
            let ans=+this.state.total+ +this.state.fine;
            this.setState({bill: ans});
            swal("LATE RETRURNED PRODUCT!!!","FINE: "+ans,"warning")
            .then((value) => {
              fetch('https://node-ors-server.herokuapp.com/demo/change/',{
          method:"Post",
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify(this.state)
      })
    .then(response => {
      window.location.replace(window.location.origin+"/mybooking");  });
    })
    .catch(error => {
      console.log(error);
    });
              
        }
        else if(target.getFullYear() == now.getFullYear()) 
        {
        if (now.getMonth()>target.getMonth()) {
          f=1;
            console.log("AFTER MONTH");
            var fi=(Math.round(diffInDays)*this.state.fine);
            this.state.fine=parseInt((Math.round(diffInDays)*this.state.fine));
            console.log(this.state.fine);
            console.log(+this.state.total+ +this.state.fine);
            let ans=+this.state.total+ +this.state.fine
            this.setState({bill: ans});
            swal("LATE RETRURNED PRODUCT!!!!","FINE: "+ ans,"warning")
            .then((value) => {
              fetch('https://node-ors-server.herokuapp.com/demo/change/',{
          method:"Post",
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify(this.state)
      })
    .then(response => {
      window.location.replace(window.location.origin+"/mybooking");  });
    })
    .catch(error => {
      console.log(error);
    });
        } 
        else if(target.getMonth() == now.getMonth())
        {
        if ( now.getDate()>target.getDate() ) {
          f=1;
            console.log("AFTER DAYS");
            var fi=(Math.round(diffInDays)*this.state.fine);
            this.state.fine=parseInt((Math.round(diffInDays)*this.state.fine));
            console.log(this.state.fine);
            console.log(+this.state.total+ +this.state.fine);
            let ans=+this.state.total+ +this.state.fine
            this.setState({bill: ans});
            swal("LATE RETURNED PRODUCT!!!!","FINE: "+ ans,"warning")
            .then((value) => {
             fetch('https://node-ors-server.herokuapp.com/demo/change/',{
          method:"Post",
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify(this.state)
      })
    .then(response => {
      window.location.replace(window.location.origin+"/mybooking");  });
    })
    .catch(error => {
      console.log(error);
    });
        }
        else
        {
          this.setState({bill: this.state.total});
          f=1;
            console.log("DATE IS OK");
            swal("ON TIME RETURNED PRODUCT!!!!","TOTAL: "+this.state.total,"success")
            .then((value) => {
              fetch('https://node-ors-server.herokuapp.com/demo/change/',{
          method:"Post",
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify(this.state)
      })
              .then(response => {
                window.location.replace(window.location.origin+"/mybooking");  });
              })
              .catch(error => {
                console.log(error);
              });
        }
        }
    
    
        }
    
       else{
         console.log("Ja be loda")
         f=1;
         this.setState({bill: this.state.total});
            console.log("DATE IS OK");
            swal("ON TIME RETURNED PRODUCT!!!!","TOTAL: "+this.state.total,"success")
            .then((value) => {
              fetch('https://node-ors-server.herokuapp.com/demo/change/',{
          method:"Post",
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify(this.state)
      })
              .then(response => {
                window.location.replace(window.location.origin+"/mybooking");  });
              })
              .catch(error => {
                console.log(error);
              });
        //return false;
        }
          if(f==0)
          {
            console.log("Juggad")
      //       this.setState({bill: this.state.total});
      //       console.log("DATE IS OK");
      //       swal("ON TIME RETURNED PRODUCT!!!!","TOTAL: "+this.state.total,"success")
      //       .then((value) => {
      //         fetch('https://node-ors-server.herokuapp.com/demo/change/',{
      //     method:"Post",
      //     headers:{
      //         'Content-Type':'application/json'
      //     },
      //     body:JSON.stringify(this.state)
      // })
      //         .then(response => {
      //           window.location.replace(window.location.origin+"/mybooking");  });
      //         })
      //         .catch(error => {
      //           console.log(error);
      //         });
          }
      }
    render() {
        return (
           <div className="container">
                      <link rel="stylesheet" href="assets/css/rentShow.css"/>
          <div className="col-xs-2">
          {this.state.lists.map((details) => (
              <div style={{display: 'inline-block',margin:"20px"}}>
            
              <link rel="stylesheet" href="assets/css/rentShow.css"/>
       <figure class="card card-product-grid card-lg"> <a href="#" class="img-wrap" data-abc="true"> <img src={details.image}></img> </a>
           <figcaption class="info-wrap">
               <div class="row">
                   <div class="col-md-9 col-xs-9"> <a href="#" class="title" data-abc="true">Item Name:{details.itemname}</a> </div>
                   <div class="col-md-9 col-xs-9"> <a href="#" class="title" data-abc="true">Name:{details.name}</a> </div>
                   
               </div>
           </figcaption>
           <div class="bottom-wrap-payment">
               <figcaption class="info-wrap">
                   <div class="row">
                       
                       
                       <div class="col-md-9 col-xs-9"> <a href="#" class="title" data-abc="true">Fine = ${details.fine}</a>  </div>
                       <div class="col-md-9 col-xs-9"> <a href="#" class="title" data-abc="true">Total = ${details.total}</a>  </div>
                       <div class="col-md-9 col-xs-9"> <a href="#" class="title" data-abc="true">Email = ${details.email}</a>  </div>
                       <div class="col-md-9 col-xs-9"> <a href="#" class="title" data-abc="true">Phoneno = ${details.phoneno}</a>  </div>
                       <div class="col-md-9 col-xs-9"> <a href="#" class="title" data-abc="true">From = ${details.from}</a>  </div>
                       <div class="col-md-9 col-xs-9"> <a href="#" class="title" data-abc="true">To = ${details.to}</a>  </div>
                       
                       
                   </div>
               </figcaption>
           </div>
           <div class="bottom-wrap"> <Button className="btn btn-primary float-center" data-abc="true" onClick={() => this.sayHello(details.fine,details.to,details.total,details._id,details.email,details.from,details.itemname,details.name,details.phoneno)}> Accept Return </Button>
             
           </div>
       </figure>
   </div>
            ))}
            </div>
           

           </div>
           
           
        ) 
      
    }
}

export default mybooking;