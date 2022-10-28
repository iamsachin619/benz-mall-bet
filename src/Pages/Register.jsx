import React from "react";
import { useState } from "react";
import {
  Panel,
  Paragraph,
  Button,
  Input,
  InputNumber,
  InputGroup,
  Badge,
  useToaster,
  Notification,
  Placeholder,
} from "rsuite";

export default function Register() {
  const toaster = useToaster();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [Cpass, setCpass] = useState("");

  const message = (
    <Notification type="success" header={email} closable>
      <Placeholder.Paragraph style={{ width: 320 }} rows={3} />
      <hr />
      {email}
    </Notification>
  );

  const Register = () => {
    if (!email) {
    }

    console.log("ere");
    toaster.push(message, { placement: "bottomEnd" });
  };
  return (
    <div className="CardMain mt-5">
      <Panel>
        <div>
          <h2>Register</h2>
          {/* <p>for Bet ID no. 32429353</p> */}
          <div>
            {/* <div className="Selections">
                  <p>
                    <b>Make a selection</b>
                  </p>
                  
                </div> */}
            <div className="valueInputComp">
              <Input
                placeholder="Email"
                className="my-3"
                onChange={(str) => {
                  console.log({e})
                  setEmail(str);
                }}
                value={email}
              />
              <Input
                placeholder="Password"
                type="password"
                className="my-3"
                onChange={(e) => {
                  setPass(e);
                }}
                value={pass}
              />
              <Input
                placeholder="Confirm Password"
                type="password"
                className="my-3"
                onChange={(e) => {
                  setCpass(e);
                }}
                value={Cpass}
              />
            </div>
            <div className="SubmitBtn">
              <Button
                appearance="primary"
                color="red"
                onClick={() => {
                  Register();
                }}
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}
