import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import history from "./history";
import {Button} from 'reactstrap';
import "../App.css";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    navigate1() {

    }
    navigate() {
        history.push("/login");
    }

    render() {
        //console.log("Inside Home-->",localStorage.getItem('logged'));
        return (
            <div>
                <div className="bgImg2">
                    <img src="http://seekvectorlogo.com/wp-content/uploads/2018/12/sugarcrm-vector-logo.png" alt="Sugar Logo"
                    />
                </div>
                <div className="">
                    <h1 style={{position:"absolute", textAlign: "center", top:"10%", left:"35%", color:"#6a00b1" }}> Hint React.js-Node.js Demo</h1>
                </div>
                <Button
                    className="start-btn"
                    type="button"
                    onClick={() => history.push("./login")}>
                    Verify-Hint
                </Button>
            </div>
        );
    }
}

export default withRouter(Home);
