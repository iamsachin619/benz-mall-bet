import "./Nav.css";
import { Drawer, Nav, useToaster } from "rsuite";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { apiHost } from "../../env";

export default function NavBar({ user, setUser }) {
  const [navOpen, setNav] = useState(false);
  const navigation = useNavigate();
  const toaster = useToaster();
  let navOptions = {
    user: [{ lable: "Orders", link: "/orders" }],
    noUser: [
      { lable: "Login", link: "/Login" },
      { lable: "Register", link: "/Register" },
    ],
  };

  const messageErr = (
    <Notification type={"info"} header={"Signed Out!"}></Notification>
  );

  const SignOut = () => {
    fetch(apiHost + "/user/signOut")
      .then((res) => {
        toaster.push(messageErr, { placement: "bottomEnd" });
      })
      .catch((err) => console.log({ errSignOut: err }));
  };
  return (
    <div>
      <nav class="navbar">
        <div class="logo">
          
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            <img
            src="icon-trans.png"
            width="50"
            style={{ marginRight: "10px" }}
          ></img>
            <p style={{ fontWeight: "bold", display: "inline" }}>Benz Mall</p>
          </Link>
        </div>

        <nav class="">
          <ul class="nav-links">
            {/* <input type="checkbox" id="checkbox_toggle" /> */}
            {/* <label for="checkbox_toggle" class="hamburger">
            &#9776;
          </label> */}
            <div class="menu">
              {user &&
                navOptions.user.map((menuItem) => {
                  return (
                    <li>
                      <Link to={menuItem.link}>{menuItem.lable}</Link>
                    </li>
                  );
                })}

              {!user &&
                navOptions.noUser.map((menuItem) => {
                  return (
                    <li>
                      <Link to={menuItem.link}>{menuItem.lable}</Link>
                    </li>
                  );
                })}
              {user && (
                <li
                  onClick={() => {
                    setUser(null);
                    SignOut();
                  }}
                >
                  <a style={{cursor:'pointer'}}>Signout</a>
                </li>
              )}
            </div>
          </ul>
        </nav>
        <div className="toggleBtn">
          <input
            type="checkbox"
            id="checkbox_toggle"
            onClick={() => {
              console.log("rer");
              setNav(true);
            }}
          />
          <label for="checkbox_toggle" class="hamburger">
            &#9776;
          </label>
        </div>

        <Drawer
          size="full"
          backdrop={true}
          open={navOpen}
          placement="right"
          onClose={() => setNav(false)}
        >
          <Drawer.Header>
            <Drawer.Title>Welcome</Drawer.Title>
            {/* <Drawer.Actions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)} appearance="primary">
            Confirm
          </Button>
        </Drawer.Actions> */}
          </Drawer.Header>
          <Drawer.Body>
            <Nav>
              {user &&
                navOptions.user.map((menuItem) => {
                  return (
                    <Nav.Item
                      onClick={() => {
                        setNav(false);
                        navigation(menuItem.link);
                      }}
                    >
                      {menuItem.lable}
                    </Nav.Item>
                  );
                })}

              {!user &&
                navOptions.noUser.map((menuItem) => {
                  return (
                    <Nav.Item
                      onClick={() => {
                        setNav(false);
                        navigation(menuItem.link);
                      }}
                    >
                      {menuItem.lable}
                    </Nav.Item>
                  );
                })}
              {user && (
                <Nav.Item
                  onClick={() => {
                    setNav(false);
                    setUser(null);
                    SignOut();
                    toaster.push(messageErr, { placement: "bottomEnd" });
                  }}
                >
                  Logout
                </Nav.Item>
              )}
            </Nav>
          </Drawer.Body>
        </Drawer>
      </nav>
    </div>
  );
}
