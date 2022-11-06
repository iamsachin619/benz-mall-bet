import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import {
  Panel,
  Paragraph,
  Button,
  Input,
  InputNumber,
  InputGroup,
  Badge,
  useToaster,
  Notification
} from "rsuite";
import { apiHost } from '../env';
import Loader from 'rsuite/Loader';


export default function Login({setUser}) {
  const toaster = useToaster();
  const navigation = useNavigate()

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  

  const [err, setErr] = useState(null)
  const [load, setLoad] = useState(false)
useEffect(()=>{
    if(err){
      toaster.push(messageErr, { placement: "bottomEnd",duration:0 });
    }
  },[err])
  const messageErr = (
    <Notification type={err?.type} header={err?.msg} >
   
    </Notification>
  );

  const Login = () =>{
    setLoad(true)
    if (!email) {setErr({msg:'Please enter email', type:'error'}); return;}
    if(!pass) {setErr({msg:'Please enter password', type:'error'}); return;}

    fetch(apiHost + '/user/login',{
      method:'post',
      credentials:'include',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        email:email.toLowerCase(),
        pass
      })
    })
    .then(async res => {
      setLoad(false)
      console.log({res})
      if(res.status == 200){
        setErr({msg:'Login successfully',type:'success'})
        //setUser
        let data = await res.json()
        console.log({data})
        setUser(data)
        navigation('/')
      }else{
        let errMsg = await res.json()
        console.log({errMsg})
        setErr({msg:errMsg.message, type:'error'})
      }
    })
    .catch((err)=>{
      setLoad(false)
      console.log({err})
    })
  }
  return (
    <div className='CardMain mt-5'>
        <Panel >
            <div>
              <h2>Login</h2>
              {/* <p>for Bet ID no. 32429353</p> */}
              <div>
                {/* <div className="Selections">
                  <p>
                    <b>Make a selection</b>
                  </p>
                  
                </div> */}
                <div className="valueInputComp">
                <Input placeholder="Email"  className='my-3' onChange={(str) => {
                  console.log({str})
                  setEmail(str);
                }}
                value={email}/>
                <Input placeholder="Password" type='password'  className='my-3' onChange={(e) => {
                  setPass(e);
                }}
                value={pass}/>
                </div>
                <div className="SubmitBtn">
                  <Button
                    appearance="primary"
                    color="red"
                    onClick={Login}
                  >
                    {load?<Loader/>:"Login"}
                  </Button>
                </div>
                <p className='pt-3'>
                    Don't have an account? <Link to="/Register">Register here!</Link>
                </p>
              </div>
            </div>
          </Panel>
    </div>
  )
}
