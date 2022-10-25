import React from "react";
import "./Nav.css";
import { Drawer } from "rsuite";
class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      navOpen: false
    };
  }

  render() {
    return (
      <div>
        <nav class="navbar">
          <div class="logo">Benz Mall</div>
          <input
            type="checkbox"
            id="checkbox_toggle"
            onClick={() => this.setState({ navOpen: true })}
          />
          <label for="checkbox_toggle" class="hamburger">
            &#9776;
          </label>
          {/* <nav class="navbar">
          <div class="logo">Benz Mall</div>
          <ul class="nav-links">
            <input type="checkbox" id="checkbox_toggle" />
            <label for="checkbox_toggle" class="hamburger">
              &#9776;
            </label>
            <div class="menu">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/">About</a>
              </li>
              <li class="services">
                <a href="/">Services</a>
              </li>
              <li>
                <a href="/">Pricing</a>
              </li>
              <li>
                <a href="/">Contact</a>
              </li>
            </div>
          </ul>
        </nav> */}
          <Drawer
            // size='xs'
            full
            backdrop={true}
            open={this.state.navOpen}
            placement="right"
            onClose={() => this.setState({ navOpen: false })}
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
            <Drawer.Body></Drawer.Body>
          </Drawer>
        </nav>
      </div>
    );
  }
}
export default Nav;
