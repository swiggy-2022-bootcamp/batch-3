import React from "react";
// import "./App.scss";
// import { Login, Register } from "./components/login/index";
import { Login } from "./components/login/index";
import { DatePicker } from "antd";
import "antd/dist/antd.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogginActive: false,
    };
  }

  render() {
    const { isLogginActive } = this.state;
    const current = isLogginActive ? "Register" : "Login";
    return (
      <div className="App">
        <div className="login">
          <div className="container">
            <Login isLogginActive={this.state.isLogginActive} />
            {/* {!isLogginActive && (
              <Register containerRef={(ref) => (this.current = ref)} />
            )} */}
          </div>
        </div>
      </div>
    );
  }
}
export default App;
