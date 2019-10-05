import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt, Switch} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import login from './components/login'
import Layout from './components/Layout'

const User = (params) => {
  return ( <h1> Welcome User {params.username} </h1>)
}

class App extends Component {
  state = {
    loggedIn:false,
    images: []
  }
  loginHandle = () => {
    this.setState(prevState => ({
     loggedIn: !prevState.loggedIn  
    }))
  }
  componentDidMount(){
    axios.get('https://www.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=667a6ce5f358b237ec13e9d99bb659de&group_id=2309748%40N20&format=rest')
    .then((Response)=>{
        
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(Response.data, "text/xml");
        const Rawimages = xmlDoc.getElementsByTagName('photo');
        const images = []
        for(let item of Rawimages){
            images.push({
                url: `https://farm${item.attributes.farm.value}.staticflickr.com/${item.attributes.server.value}/${item.attributes.id.value}_${item.attributes.secret.value}.jpg`,
                id: item.attributes.id.value,
                height: (Math.floor(Math.random() * 500) + 100) > 500? 500 : (Math.floor(Math.random() * 500) + 100)
            })

        }
        this.setState(prevState => ({
          images
         }))
      });
  }
  render() {
    return (
      <Router>
        <div className="App">
        {/* <ul>
          <li>
            <NavLink to="/" exact activeStyle={
              { color:'green' }
            }>Home</NavLink>
          </li>
          <li>
            <NavLink to="/about" exact activeStyle={
              { color:'green' }
            }>About</NavLink>
          </li>
          <li>
            <NavLink to="/user/john" exact activeStyle={
              { color:'green' }
            }>User John</NavLink>
          </li>
          <li>
            <NavLink to="/user/peter" exact activeStyle={
              { color:'green' }
            }>User Peter</NavLink>
          </li>
          </ul>
          <Prompt
            when={!this.state.loggedIn}
            message={(location)=>{
               return location.pathname.startsWith('/user') ? 'Are you sure?' : true
             }}
          /> */}

        {/* <input type="button" value={this.state.loggedIn ? 'log out': 'log in'} onClick={this.loginHandle.bind(this)}/> */}
          <Switch>
        <Route path="/" exact  component={login}/>
        <Route path="/image/:id" exact strict render={(props)=>(<Layout images={this.state.images } {...props} ></Layout>)}/>
        <Route path="/image" exact strict render={(props)=>(<Layout images={this.state.images } {...props} ></Layout>)}/>
        <Route path="*"  render={()=>{
          if (typeof window === 'object') window.location.href = '/';
          // return null;
        }}/>
        </Switch>
        
        
        </div>
      </Router>
    );
  }
}

export default App;
