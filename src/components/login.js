import React, {useState, useEffect} from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import '../App.css';
const emailReg =  new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
const login = (props) => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [errorMsg, seterrorMsg] = useState({
        show:true,
        email: '',
        password:''
    });
    useEffect(() => {
        
            if(localStorage && localStorage.getItem("login")){
                props.history.push('/image');
            }          
    }, []);
    const getValidationState = ()=> {
       
      }
    
      const handleChange = (e)=> {
       
        
        e.target.name === 'email'? setemail(e.target.value): setpassword(e.target.value)
      }
      const login = ()=>{
        if(!password){
            seterrorMsg((current)=>{
                return {
                    ...current,
                    show:true,
                    email: '',
                    password: 'Password can not be empty'

                }
            })   
            return;
        }
        if(!email){
            seterrorMsg((current)=>{
                return {
                    ...current,
                    show:true,
                    password: '',
                    email: 'Email can not be empty'

                }
            })   
            return
        }
        if(!emailReg.test(email)){
            seterrorMsg((current)=>{
                return {
                    ...current,
                    show:true,
                    password:'',
                    email: 'Invalid email'

                }
            })   
            return
        }
        if(localStorage){
            localStorage.setItem('login', JSON.stringify({email:email, password: btoa(password)}))
        }
        
        props.history.push('/image');
      }
    return (
        <div className="login-main-wrapper">
        <div className="login-wrapper">
            <form>
        <FormGroup
          controlId="formBasicText"
          validationState={getValidationState()}
        >
          <FormControl
            type="email"
            value={email}
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
          />
          <FormControl.Feedback />
          
        </FormGroup>
        <FormGroup
          controlId="formBasicText"
          validationState={getValidationState()}
        >
          <FormControl
            type="password"
            value={password}
            placeholder="Enter Password"
            onChange={handleChange}
          />
          <FormControl.Feedback />
          {errorMsg.show ? <HelpBlock>{errorMsg.password || errorMsg.email}</HelpBlock> : null}  
        </FormGroup>
        <Button onClick={login}>Login</Button>
      </form>
        </div>
        </div>
    );
}

export default login;
