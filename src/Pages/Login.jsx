import React from 'react'
import {
  Panel,
  Paragraph,
  Button,
  Input,
  InputNumber,
  InputGroup,
  Badge,
  useToaster
} from "rsuite";

export default function Login() {
  const toaster = useToaster();

  // const message = (
  //   <Notification type={type} header={type} closable>
      
  //     <hr />
  //     <Uploader action="#" />
  //   </Notification>
  // );

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
                <Input placeholder="Email"  className='my-3'/>
                <Input placeholder="Password" type='password'  className='my-3'/>
                </div>
                <div className="SubmitBtn">
                  <Button
                    appearance="primary"
                    color="red"
                  
                  >
                    Login
                  </Button>
                </div>
              </div>
            </div>
          </Panel>
    </div>
  )
}
