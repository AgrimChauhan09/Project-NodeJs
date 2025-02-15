import React from 'react'
import {useNavigation , useNavigate} from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate=useNavigate();
    
    
    const handleLogin = async () => {
        let result = await fetch("http://localhost:5000/login", {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        result=await result.json();
        console.warn(result)
        if(result.auth){
            localStorage.setItem('user',JSON.stringify(result.user));
            localStorage.setItem('token',JSON.stringify(result.auth));
            navigate("/")
        }else{
            alert("please enter connect details")
        }
    }



    return (
        <div className='login'>
            <input type='text' className="inputbox" placeholder='  Enter email'
                onChange={(e) => setEmail(e.target.value)} value={email} />
            <input type='password' className="inputbox" placeholder='Enter password'
                onChange={(e) => setPassword(e.target.value)} value={password} />
            <button onClick={handleLogin} className="appbutton" type="button"> Login</button>
        </div>
    )
}
  

export default Login