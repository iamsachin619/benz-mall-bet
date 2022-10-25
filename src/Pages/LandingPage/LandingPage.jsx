import React from "react";
import Nav from "../../Components/Nav/Nav";
import "./LandingPage.css";
import {
  Panel,
  Paragraph,
  Button,
  InputNumber,
  InputGroup,
  Badge
} from "rsuite";

class LandingPage extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedBtn: null,
      betValue: 10
    };
    this.handleBtnSelection = this.handleBtnSelection.bind(this);
  }

  handleBtnSelection(e) {
    // console.log(e.target.innerHTML.split("<")[0]);
    const name = e.target.innerHTML.split("<")[0];
    this.setState({ selectedBtn: name });
  }

  handleMinus = () => {
    if (this.state.betValue === 10) {
      return;
    } else {
      this.setState({ betValue: parseInt(this.state.betValue, 10) - 10 });
    }
  };

  handlePlus = () => {
    this.setState({ betValue: parseInt(this.state.betValue, 10) + 10 });
  };
  render() {
    return (
      <div>
        <div className="CardMain">
          {/*  */}
          <Panel header="Place Your Bets!">
            <div>
              <h2>00:00</h2>
              <p>for Bet ID no. 32429353</p>
              <div>
                <div className="Selections">
                  <p>
                    <b>Make a selection</b>
                  </p>
                  <div className="btns">
                    {/* for GREEN BUTTON */}
                    {this.state.selectedBtn !== null ? (
                      this.state.selectedBtn === "Green" ? (
                        <Button
                          onClick={this.handleBtnSelection}
                          color="green"
                          appearance="primary"
                        >
                          Green
                        </Button>
                      ) : (
                        <Button
                          onClick={this.handleBtnSelection}
                          color="green"
                          appearance="ghost"
                        >
                          Green
                        </Button>
                      )
                    ) : (
                      <Button
                        onClick={this.handleBtnSelection}
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
                    {this.state.selectedBtn !== null ? (
                      this.state.selectedBtn === "Yellow" ? (
                        <Button
                          onClick={this.handleBtnSelection}
                          color="yellow"
                          appearance="primary"
                        >
                          Yellow
                        </Button>
                      ) : (
                        <Button
                          onClick={this.handleBtnSelection}
                          color="yellow"
                          appearance="ghost"
                        >
                          Yellow
                        </Button>
                      )
                    ) : (
                      <Button
                        onClick={this.handleBtnSelection}
                        color="yellow"
                        appearance="primary"
                      >
                        Yellow
                      </Button>
                    )}
                    {/* {for Violet BTn} */}
                    {this.state.selectedBtn !== null ? (
                      this.state.selectedBtn === "Violet" ? (
                        <Button
                          onClick={this.handleBtnSelection}
                          color="violet"
                          appearance="primary"
                        >
                          Violet
                        </Button>
                      ) : (
                        <Button
                          onClick={this.handleBtnSelection}
                          color="violet"
                          appearance="ghost"
                        >
                          Violet
                        </Button>
                      )
                    ) : (
                      <Button
                        onClick={this.handleBtnSelection}
                        color="violet"
                        appearance="primary"
                      >
                        Violet
                      </Button>
                    )}
                  </div>
                </div>
                <div className="valueInputComp">
                  <InputGroup
                    disabled={this.state.selectedBtn === null ? true : false}
                  >
                    <InputGroup.Button onClick={this.handleMinus}>
                      -
                    </InputGroup.Button>
                    <InputNumber
                      className={"custom-input-number"}
                      value={this.state.betValue}
                    />
                    <InputGroup.Button onClick={this.handlePlus}>
                      +
                    </InputGroup.Button>
                  </InputGroup>
                </div>
                <div className="SubmitBtn">
                  <Button
                    appearance="primary"
                    color="red"
                    disabled={this.state.selectedBtn === null ? true : false}
                  >
                    Place Order!
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
              <div>Rs. 1000</div>
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
                <th className="ans">Choice</th>
                <th className="ans">Outcome</th>
              </tr>
              <tr>
                <td className="betID">345345745</td>
                <td className="ans">
                  10 - <Badge color="green" />
                </td>
                <td className="ans">
                  <Badge color="yellow" />
                </td>
              </tr>
              <tr>
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
              </tr>
            </table>
          </Panel>
        </div>
      </div>
    );
  }
}

export default LandingPage;
