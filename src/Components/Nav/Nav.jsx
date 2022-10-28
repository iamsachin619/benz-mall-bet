
import "./Nav.css";
import { Drawer,Nav } from "rsuite";
import React ,{ useState }from 'react'
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";


export default function NavBar({user}) {
  const [navOpen, setNav] = useState(false)
  const navigation = useNavigate()

  let navOptions = {
    user:[
      {lable:'Orders', link:'/orders'}
    ],
    noUser:[
      {lable:'Login', link:'/Login'},
      {lable:'Register', link:'/Register'},


    ]
  }
  return (
    <div>
      <nav class="navbar">
        <div class="logo">Benz Mall</div>
        
        <nav class="">
        
        <ul class="nav-links">
          {/* <input type="checkbox" id="checkbox_toggle" /> */}
          {/* <label for="checkbox_toggle" class="hamburger">
            &#9776;
          </label> */}
          <div class="menu">
            {user && navOptions.user.map((menuItem)=>{
              return(
                <li>
                <Link to={menuItem.link}>{menuItem.lable}</Link>
              </li>
              )
            })}
            
            {!user && navOptions.noUser.map((menuItem)=>{
              return(
                <li>
                <Link to={menuItem.link}>{menuItem.lable}</Link>
              </li>
              )
            })}
            {user && 
            <li>
               <a href='/signout'>Signout</a>
              </li>}
          </div>
        </ul>
      
        </nav>
        <div className="toggleBtn">
        <input
          type="checkbox"
          id="checkbox_toggle"
          onClick={() => {
            console.log('rer')
            setNav(true)}}
        />
        <label for="checkbox_toggle" class="hamburger">
          &#9776;
        </label>
        </div>

        <Drawer
          size='full'
          
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
            <Nav activeKey="1">
              
              {user && navOptions.user.map((menuItem)=>{
              return(
                <Nav.Item onClick={()=>{
                  navigation(menuItem.link)
                }}>
                
                
                  {menuItem.lable}
                
              </Nav.Item>
              
              )
            })}
            
            {!user && navOptions.noUser.map((menuItem)=>{
              return(
                <Nav.Item onClick={()=>{
                  navigation(menuItem.link)
                }}>
               {menuItem.lable}
              </Nav.Item>
              )
            })}
            </Nav>


          </Drawer.Body>
        </Drawer>
      </nav>
    </div>
  );
}



