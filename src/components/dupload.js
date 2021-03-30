import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import rent from '../image/rent.png';
import Nav from './Navbar';
import { Link, withRouter } from 'react-router-dom'


export default class ModalComponent extends React.Component {
  
  constructor(props) {
    super(props);
    var nam=null;
    if(localStorage.getItem("login"))
    {
      nam=localStorage.getItem("login");
    }
    this.onFileChange = this.onFileChange.bind(this);
    this.state = { modal: false,name: '',
    image: '',email:'',phoneno:'',itemname:'',
    itemdetail:'',rent:'',fine:'',oname:nam,oid:'', url:''};

    this.toggle = this.toggle.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeemail = this.handleChangeemail.bind(this);
    this.handleChangephoneno = this.handleChangephoneno.bind(this);
    this.handleChangeitemname = this.handleChangeitemname.bind(this);
    this.handleChangeitemdetail = this.handleChangeitemdetail.bind(this);
    this.handleChangerent = this.handleChangerent.bind(this);
    this.handleChangefine = this.handleChangefine.bind(this);  
    this.handleSubmit = this.handleSubmit.bind(this);
    this.create();


  }
  onFileChange(e) {
    
    this.setState({ image: e.target.files[0] })
    
      
      
  }
  create(){
    console.log(window.location.origin)
    console.log("create method called");
    axios.post('https://node-ors-server.herokuapp.com/demo/show1/'+this.state.oname)
    .then(response => {
        console.log(response);
        console.log(response.data.Users.username);
        this.setState({name: response.data.Users.username});
        this.setState({email: response.data.Users.email});
        this.setState({phoneno:  response.data.Users.phoneno});
        this.setState({oid:  response.data.Users._id});
          localStorage.setItem("oid",response.data.Users._id)
          console.log(response.data.Users._id);
         
      
    })
    .catch(error => {
      console.log(error);
    });
  }
  
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  handleChangeName(event) {
    this.setState({name: event.target.value});
  }
  handleChangeemail(event) {
    this.setState({email: event.target.value});
  }
  handleChangephoneno(event) {
    this.setState({phoneno: event.target.value});
  }
  handleChangeitemname(event) {
    this.setState({itemname: event.target.value});
  }
  handleChangeitemdetail(event) {
    this.setState({itemdetail: event.target.value});
  }
  handleChangerent(event) {
    this.setState({rent: event.target.value});
  }
  handleChangefine(event) {
    this.setState({fine: event.target.value});
  }
  

  handleSubmit=(event)=> {
    event.preventDefault();
      // console.log(this.state.image)
      // var url = "https://api.cloudinary.com/v1_1/dbs2n4nqo/image/upload/";
      // var path = "Rent/"+this.state.image.name;
      // var data = new FormData();
      // data.append("file", this.state.image);
      // data.append("upload_preset", "");
      // data.append("public_id", path);
      // const config = {
      //   headers: { "X-Requested-With": "XMLHttpRequest" },
      // };
      // axios
      //   .post(url, data, config)
      //   .then(async (res) => {console.log(res)});

      
    const data  = new FormData()
    data.append("file", this.state.image)
    data.append('upload_preset', 'renting')
    const formData = new FormData()
    
    axios.post("https://api.cloudinary.com/v1_1/dbs2n4nqo/image/upload", data)
    .then(response => {
      
      this.setState({url: response.data.secure_url});
    console.log(this.state.url);

    formData.append('image', this.state.url);
    formData.append('username',this.state.name);
    formData.append('email',this.state.email);
    formData.append('oid',this.state.oid);
    formData.append('phoneno',this.state.phoneno);
    formData.append('itemname',this.state.itemname);
    formData.append('itemdetail',this.state.itemdetail);
    formData.append('rent',this.state.rent);
    formData.append('fine',this.state.fine);
    console.log(formData);
    
  })
    
   const timer =setTimeout(()=>{
    console.log(this.state.image);
    axios.post("https://node-ors-server.herokuapp.com/demo/user-profile", formData, {
    }).then(res => {
        console.log(res)
    })
  },6000);
      
      
      
     }

red()
{
  window.location.replace(window.location.origin+"/show1");  
  
}
  render() {
    return (

      
      
      <div className="banner">
         <link rel="stylesheet" href="assets/css/movetext.css"/>

          <div className="menu-area">
            <ul>
              <li><Link to="/show1">
            Rent
          </Link>
          </li>
              
          <li><Link to="/dupload" onClick={this.toggle}>Add</Link></li>
              <li><Link to="/mybooking">Return</Link></li>
            </ul>
          </div>


                    <div className="banner-text">

    <h2>Hello {this.state.name}</h2>
                      <div className="text-wrapper">
                        <div className="box b1">Sell</div>
                        <div className="box b2">Buy</div>
                        <div className="box b3">Rent</div>
                        <div className="box b4">At one place</div>
                        <div className="box b5">100% Secure</div>
                      </div>
                    </div>
                    <Modal isOpen={this.state.modal} >
        <form onSubmit={this.handleSubmit}>
          <ModalHeader>Add Details</ModalHeader>
          <ModalBody style={{backgroundColor:'#56baed'}}>
            
          <div className="row">
            <div className="form-group col-md-8">
            <label>UserName</label>
            <input type="text" value={this.state.oid}  className="form-control form-rounded" />
              </div>
              </div>
          <div className="row">
            <div className="form-group col-md-4">
            <label>UserName</label>
            <input type="text" value={this.state.name}  className="form-control form-rounded" />
              </div>
              </div>
            <div className="row">
             <div className="form-group col-md-8">
            <label>Email address</label>
                <input type="text" value={this.state.email}  className="form-control form-rounded" />
               </div>
              </div>
              <div className="row">
             <div className="form-group col-md-4">
            <label>Select Photo:</label>
            <input type="file" onChange={this.onFileChange}  />
               </div>
              </div>
              <div className="row">
             <div className="form-group col-md-4">
            <label>Phone NO</label>
                <input type="text" value={this.state.phoneno}  className="form-control form-rounded" />
               </div>
              </div>
              <div className="row">
             <div className="form-group col-md-4">
            <label>Item Name</label>
                <input type="text" value={this.state.itemname} onChange={this.handleChangeitemname} className="form-control form-rounded" />
               </div>
              </div>
              <div className="row">
             <div className="form-group col-md-10">
            <label>Item Details</label>
            <textarea name="itemdetail"  rows="5" cols="45"  onChange={(event) => {this.setState({itemdetail: event.target.value })}} className="form-control form-rounded"></textarea>
               </div>
              </div>
              <div className="row">
             <div className="form-group col-md-4">
            <label>Rent</label>
                <input type="text" value={this.state.rent} onChange={this.handleChangerent} className="form-control form-rounded" />
               </div>
              </div>
              <div className="row">
             <div className="form-group col-md-4">
            <label>Fine</label>
                <input type="text" value={this.state.fine} onChange={this.handleChangefine} className="form-control form-rounded" />
               </div>
              </div>
          
          </ModalBody>
          
          <ModalFooter>
            <input type="submit" value="Submit" color="primary" className="btn btn-primary" onClick={this.handleSubmit} />
            <Button color="danger" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
          </form>
        </Modal>
                  </div>
            
      );
  }
}