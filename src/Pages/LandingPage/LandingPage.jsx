import React, { useEffect,useRef } from "react";
import Nav from "../../Components/Nav/Nav";
import "./LandingPage.css";
import {
  Panel,
  Paragraph,
  Button,
  InputNumber,
  InputGroup,
  Badge,
  useToaster,
  Loader,
  Notification,

} from "rsuite";
import { useState } from "react";
import { apiHost } from "../../env";



export default function LandingPage({user, setUser}) {
  const toaster = useToaster()

  const [selectedBtn, setSelectedBtn ] = useState(null)
  const [betValue, setBetValue] = useState(10)

  const [load, setLoad] = useState(false)

  function handleBtnSelection(e) {
    // console.log(e.target.innerHTML.split("<")[0]);
    const name = e.target.innerHTML.split("<")[0];
    setSelectedBtn( name );
  }

  const handleMinus = () => {
    if (betValue === 10) {
      return;
    } else {
      setBetValue( parseInt(betValue, 10) - 10 );
    }
  };

  const handlePlus = () => {
    setBetValue( parseInt(betValue, 10) + 10 );
  };


  //orderHistory
  const [orderHistory, setOrderHistory] = useState([])

  const GetOrderHistory = () => {
    fetch(apiHost + '/user/orderHistory',{
      credentials:'include'
    })
    .then(async res => {
      let data = await res.json()
      console.log({data})
      setOrderHistory([...data.orderHistory])
    })
    .catch(err => console.log({err}))
  }
  useEffect( ()=>{
    GetOrderHistory()
  },[])

  const PlaceOrder = () =>{
    setLoad(true)
    fetch(apiHost + '/user/placeOrder',{
      method:'post',
      credentials:'include',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:JSON.stringify({
        "betId":activeBet.betId,
        "amt":betValue,
        "choice":selectedBtn[0]
      })
    })
    .then(async res => {
      setLoad(false)
      if(res.status == 200){
        let data = await res.json()
        console.log({data})
        setErr({type:'success', msg:'Order palced'})
        setOrderHistory([{
          
          "betId": activeBet.betId,
          "amt": betValue,
          "choice": selectedBtn[0],
          "createdAt": "2022-10-27T11:35:54.177Z",
          "result": null
      },...orderHistory])
      setUser({wallet:user.wallet - betValue, email:user.email })
      
      }else{
        let data = await res.json()
        setErr({type:'error', msg:data.message})
      }
    })
    .catch(err => {
      setLoad(false)
      console.log('err placing order')})
  }

  const GetWalletUpdated = () => {
    fetch(apiHost + '/user/getUpdatedWallet',{
      credentials:'include'
    })
    .then(async res => {
      let data = await res.json()
      console.log({wallet:data})
      setUser({...user,wallet:data})
    })
    .catch(err => console.log({err}))
  }


  const [err, setErr] = useState(null)
  useEffect(()=>{
     if(err){
       toaster.push(message, { placement: "bottomEnd",duration:0 });
     }
   },[err])
  const message = (
    <Notification type={err?.type} header={err?.msg} >
   
    </Notification>
  );

  
  const [activeBet, setActiveBet] = useState(null)
  useEffect(()=>{
    GetActiveBet()
  },[])

  
  const GetActiveBet = () =>{
    fetch(apiHost + '/user/activeBet')
    .then( async res => {
      if(res.status == 200){
        let data = await res.json()
        setActiveBet({...data})

      }else{
        setErr({type:'error', msg:'Try refreshing'})
      }
    })
  }
      useEffect(() => {
        clearTimer(getDeadTime());
        GetWalletUpdated()
    }, [activeBet]);
  //TIMER
  const Ref = useRef(null);
  
    // The state for our timer
    const [timer, setTimer] = useState('00:00');
  
  
    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }
  
  
    const startTimer = (e) => {
        let { total, hours, minutes, seconds } 
                    = getTimeRemaining(e);
        if (total >= 0) {
  
            // update the timer
            // check if less than 10 then we need to 
            // add '0' at the beginning of the variable
            setTimer(
                // (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }
  
  
    const clearTimer = (e) => {
  
        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next    
        // setTimer('02:00');
  
        // If you try to remove this line the 
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }
  
    const getDeadTime = () => {
       
  
        // This is where you need to adjust if 
        // you entend to add more time
        if(!activeBet){return 0}
        let deadline = new Date(activeBet.createdAt)
        deadline.setSeconds(deadline.getSeconds() + 120);
        console.log({activeBet})
        return deadline;
    }
  
    // We can use useEffect so that when the component
    // mount the timer will start as soon as possible
  
    // We put empty array to act as componentDid
    // mount only
    // useEffect(() => {
    //     clearTimer(getDeadTime());
    // }, []);
  
    // Another way to call the clearTimer() to start
    // the countdown is via action event from the
    // button first we create function to be called
    // by the button
    const ResetTimer = () => {
        clearTimer(getDeadTime());
    }

    useEffect(()=>{
      // console.log({timer})
      if(timer == '00:00'){

        setTimeout(()=>{
          GetActiveBet()
          GetOrderHistory()
        },1000)
      }
    },[timer])
  return (
    <div>
      <div className="CardMain">
        {/*  */}
        <Panel header="Place Your Bets!">
          <div>
            <h2>{timer}</h2>
            <p>for Bet ID no. {activeBet?.betId}</p>
            <div>
              <div className="Selections">
                <p>
                  <b>Make a selection</b>
                </p>
                <div className="btns">
                  {/* for GREEN BUTTON */}
                  {selectedBtn !== null ? (
                    selectedBtn === "Green" ? (
                      <Button
                        onClick={handleBtnSelection}
                        color="green"
                        appearance="primary"
                      >
                        Green
                      </Button>
                    ) : (
                      <Button
                        onClick={handleBtnSelection}
                        color="green"
                        appearance="ghost"
                      >
                        Green
                      </Button>
                    )
                  ) : (
                    <Button
                      onClick={handleBtnSelection}
                      color="green"
                      appearance="primary"
                    >
                      Green
                    </Button>
                  )}
                  {/* <Button color="green" appearance="primary">
                    Green
                  </Button> */}
                  {/* for Yelow BUTTON */}
                  {selectedBtn !== null ? (
                    selectedBtn === "Yellow" ? (
                      <Button
                        onClick={handleBtnSelection}
                        color="yellow"
                        appearance="primary"
                      >
                        Yellow
                      </Button>
                    ) : (
                      <Button
                        onClick={handleBtnSelection}
                        color="yellow"
                        appearance="ghost"
                      >
                        Yellow
                      </Button>
                    )
                  ) : (
                    <Button
                      onClick={handleBtnSelection}
                      color="yellow"
                      appearance="primary"
                    >
                      Yellow
                    </Button>
                  )}
                  {/* {for Violet BTn} */}
                  {selectedBtn !== null ? (
                    selectedBtn === "Violet" ? (
                      <Badge content="x 3">

                      <Button
                        onClick={handleBtnSelection}
                        color="violet"
                        appearance="primary"
                        >
                        Violet
                      </Button>
                      </Badge>
                    ) : (
                      <Badge content="x 3">

                      <Button
                        onClick={handleBtnSelection}
                        color="violet"
                        appearance="ghost"
                        >
                        Violet
                      </Button>
                        </Badge>
                    )
                  ) : (
                    <Badge content='x 3'>

                    <Button
                      onClick={handleBtnSelection}
                      color="violet"
                      appearance="primary"
                      >
                      Violet
                    </Button>
                      </Badge>
                  )}
                </div>
              </div>
              <div className="valueInputComp">
                <InputGroup
                  disabled={selectedBtn === null ? true : false}
                >
                  <InputGroup.Button onClick={handleMinus}>
                    -
                  </InputGroup.Button>
                  <InputNumber
                    className={"custom-input-number"}
                    value={betValue}
                  />
                  <InputGroup.Button onClick={handlePlus}>
                    +
                  </InputGroup.Button>
                </InputGroup>
              </div>
              <div className="SubmitBtn">
                <Button
                  appearance="primary"
                  color="red"
                  disabled={selectedBtn === null ? true : false}
                  onClick={PlaceOrder}
                >
                  {load?<Loader/>:"Place Order!"}
                </Button>
              </div>
            </div>
          </div>
        </Panel>
      </div>
      <div className="CardMain">
        <Panel header="Balance" collapsible bordered>
          <div className="flexy">
            <div>Your Balance : </div>
            <div>Rs. {user?.wallet}</div>
          </div>
          <br />
          <h6>Order History</h6>

          {/* <div className="flexy">
            <div>Bet ID no. </div>
            <div>Your Choice</div>
            <div>Outcome</div>
          </div> */}
          <table className="TableOrderHistory">
            <tr>
              <th className="betID">Bet ID</th>
              <th className="ans">Amount</th>
              <th className="ans">Choice</th>
              <th className="ans">Outcome</th>
            </tr>
            {orderHistory.length == 0 && (
              <tr>
                <th colSpan={4}>No orders yet</th>
              </tr>
            )}
            {orderHistory.map((order)=>{
              return(
                <tr className="">
              <td className="betID py-2">{order.betId}</td>
              <td className="ans">
                {order.amt} 
              </td>
              <td className="ans ">
                {order.choice == 'G' &&<Badge color="green" />}
                {order.choice == 'V' &&<Badge color="violet" />}
                {order.choice == 'Y' &&<Badge color="yellow" />}
              </td>
              <td className="ans">
                {order.result == null && <Loader size="xs"/>}
                {order.result?.length == 0 && <Loader size="xs"/>}
              {order.result?.[0] == 'G' &&<Badge color="green" />}
              {order.result?.[0] == 'V' &&<Badge color="violet" />}
              {order.result?.[0] == 'Y' &&<Badge color="yellow" />}
              </td>
            </tr>
              )
            })}
            {/* <tr>
              <td className="betID">345345745</td>
              <td className="ans">
                30 - <Badge color="violet" />
              </td>
              <td className="ans">
                <Badge color="green" />
              </td>
            </tr>
            <tr>
              <td className="betID">345345745</td>
              <td className="ans">
                100 - <Badge color="green" />
              </td>
              <td className="ans">
                <Badge color="green" />
              </td>
            </tr>
            <tr>
              <td className="betID">345345745</td>
              <td className="ans">
                10 - <Badge color="violet" />
              </td>
              <td className="ans">
                <Badge color="green" />
              </td>
            </tr>
            <tr>
              <td className="betID">345345745</td>
              <td className="ans">
                10 - <Badge color="green" />
              </td>
              <td className="ans">
                <Badge color="yellow" />
              </td>
            </tr> */}
          </table>
        </Panel>
      </div>
    </div>
  );
}


// class LandingPage extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       selectedBtn: null,
//       betValue: 10
//     };
//     this.handleBtnSelection = this.handleBtnSelection.bind(this);
//   }

//   handleBtnSelection(e) {
//     // console.log(e.target.innerHTML.split("<")[0]);
//     const name = e.target.innerHTML.split("<")[0];
//     this.setState({ selectedBtn: name });
//   }

//   handleMinus = () => {
//     if (this.state.betValue === 10) {
//       return;
//     } else {
//       this.setState({ betValue: parseInt(this.state.betValue, 10) - 10 });
//     }
//   };

//   handlePlus = () => {
//     this.setState({ betValue: parseInt(this.state.betValue, 10) + 10 });
//   };
//   render() {
//     return (
//       <div>
//         <div className="CardMain">
//           {/*  */}
//           <Panel header="Place Your Bets!">
//             <div>
//               <h2>00:00</h2>
//               <p>for Bet ID no. 32429353</p>
//               <div>
//                 <div className="Selections">
//                   <p>
//                     <b>Make a selection</b>
//                   </p>
//                   <div className="btns">
//                     {/* for GREEN BUTTON */}
//                     {this.state.selectedBtn !== null ? (
//                       this.state.selectedBtn === "Green" ? (
//                         <Button
//                           onClick={this.handleBtnSelection}
//                           color="green"
//                           appearance="primary"
//                         >
//                           Green
//                         </Button>
//                       ) : (
//                         <Button
//                           onClick={this.handleBtnSelection}
//                           color="green"
//                           appearance="ghost"
//                         >
//                           Green
//                         </Button>
//                       )
//                     ) : (
//                       <Button
//                         onClick={this.handleBtnSelection}
//                         color="green"
//                         appearance="primary"
//                       >
//                         Green
//                       </Button>
//                     )}
//                     {/* <Button color="green" appearance="primary">
//                       Green
//                     </Button> */}
//                     {/* for Yelow BUTTON */}
//                     {this.state.selectedBtn !== null ? (
//                       this.state.selectedBtn === "Yellow" ? (
//                         <Button
//                           onClick={this.handleBtnSelection}
//                           color="yellow"
//                           appearance="primary"
//                         >
//                           Yellow
//                         </Button>
//                       ) : (
//                         <Button
//                           onClick={this.handleBtnSelection}
//                           color="yellow"
//                           appearance="ghost"
//                         >
//                           Yellow
//                         </Button>
//                       )
//                     ) : (
//                       <Button
//                         onClick={this.handleBtnSelection}
//                         color="yellow"
//                         appearance="primary"
//                       >
//                         Yellow
//                       </Button>
//                     )}
//                     {/* {for Violet BTn} */}
//                     {this.state.selectedBtn !== null ? (
//                       this.state.selectedBtn === "Violet" ? (
//                         <Button
//                           onClick={this.handleBtnSelection}
//                           color="violet"
//                           appearance="primary"
//                         >
//                           Violet
//                         </Button>
//                       ) : (
//                         <Button
//                           onClick={this.handleBtnSelection}
//                           color="violet"
//                           appearance="ghost"
//                         >
//                           Violet
//                         </Button>
//                       )
//                     ) : (
//                       <Button
//                         onClick={this.handleBtnSelection}
//                         color="violet"
//                         appearance="primary"
//                       >
//                         Violet
//                       </Button>
//                     )}
//                   </div>
//                 </div>
//                 <div className="valueInputComp">
//                   <InputGroup
//                     disabled={this.state.selectedBtn === null ? true : false}
//                   >
//                     <InputGroup.Button onClick={this.handleMinus}>
//                       -
//                     </InputGroup.Button>
//                     <InputNumber
//                       className={"custom-input-number"}
//                       value={this.state.betValue}
//                     />
//                     <InputGroup.Button onClick={this.handlePlus}>
//                       +
//                     </InputGroup.Button>
//                   </InputGroup>
//                 </div>
//                 <div className="SubmitBtn">
//                   <Button
//                     appearance="primary"
//                     color="red"
//                     disabled={this.state.selectedBtn === null ? true : false}
//                   >
//                     Place Order!
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </Panel>
//         </div>
//         <div className="CardMain">
//           <Panel header="Balance" collapsible bordered>
//             <div className="flexy">
//               <div>Your Balance : </div>
//               <div>Rs. {this.props.user?.wallet}</div>
//             </div>
//             <br />
//             <h6>Order History</h6>

//             {/* <div className="flexy">
//               <div>Bet ID no. </div>
//               <div>Your Choice</div>
//               <div>Outcome</div>
//             </div> */}
//             <table className="TableOrderHistory">
//               <tr>
//                 <th className="betID">Bet ID</th>
//                 <th className="ans">Choice</th>
//                 <th className="ans">Outcome</th>
//               </tr>
//               <tr>
//                 <td className="betID">345345745</td>
//                 <td className="ans">
//                   10 - <Badge color="green" />
//                 </td>
//                 <td className="ans">
//                   <Badge color="yellow" />
//                 </td>
//               </tr>
//               <tr>
//                 <td className="betID">345345745</td>
//                 <td className="ans">
//                   30 - <Badge color="violet" />
//                 </td>
//                 <td className="ans">
//                   <Badge color="green" />
//                 </td>
//               </tr>
//               <tr>
//                 <td className="betID">345345745</td>
//                 <td className="ans">
//                   100 - <Badge color="green" />
//                 </td>
//                 <td className="ans">
//                   <Badge color="green" />
//                 </td>
//               </tr>
//               <tr>
//                 <td className="betID">345345745</td>
//                 <td className="ans">
//                   10 - <Badge color="violet" />
//                 </td>
//                 <td className="ans">
//                   <Badge color="green" />
//                 </td>
//               </tr>
//               <tr>
//                 <td className="betID">345345745</td>
//                 <td className="ans">
//                   10 - <Badge color="green" />
//                 </td>
//                 <td className="ans">
//                   <Badge color="yellow" />
//                 </td>
//               </tr>
//             </table>
//           </Panel>
//         </div>
//       </div>
//     );
//   }
// }

// export default LandingPage;
