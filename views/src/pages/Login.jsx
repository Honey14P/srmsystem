import React, { Component } from 'react'
//import logo from './Images/dahome.png';
import './assets/css/Login'


export default class login extends Component {
  render() {
    return (
        <>
        <div id="myDIV">
            <div class="box1">
                 <img src={logo} alt="an image" height={80} width={80} />
            </div>
            
            <div class="box2">
                <h1 class="heading" align="center"> Result Management System</h1>
            </div>

            <div class="box3" >
                <button margin-top="50px" onclick="window.location.href='studenthome.html'">Home</button> 
            </div>
        </div>
        <br />
        <center>
            <div class="wrapper">   
                <div class="title">Login</div>
                <form action="#">
                <div class="field">
                    <input type="text" required/>
                    <label>Email Address</label>
                </div>

                <div class="field">
                    <input type="password" required/>
                    <label>Password</label>
                </div>

                <div class="field">
                    <input type="submit" value="Login"/>
                </div>
                
                </form>
            </div>
        </center>    
        </>
    );
  }
}

