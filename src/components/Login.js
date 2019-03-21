import React, {Component} from 'react';
import {actionlogin} from '../actions/loginactions';
import {connect} from 'react-redux';
import history from "./history";
import {Button} from 'reactstrap';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
             email:'',
            password: '',
            visible: true,
            grant_type:"password",
            username:"",
            client_id:"sugar",
            platform:"base",
            client_secret:"",
            current_language:"en_us",
            client_info:{current_language:"en_us"}
        };
        this.onDismiss = this.onDismiss.bind(this);
    }


    onDismiss(){
        this.setState({ visible: false });
    }
    render() {
        console.log("Props-->", this.props.loggedin);
        if (this.props.loggedin === "200") {
            history.push('/Welcome');
        }
            return (
                <div>
                     {(() => {
                            if (this.props.loggedin===401 && this.state.visible===true) {
                                this.setState({visible:false});
                                return (alert("Invalid username or License !!!"));
                            }
                        })()}
                    <div className="bgImg">
                        <img
                            src="http://paperlief.com/images/busy-city-street-wallpaper-1.jpg"
                            alt="Turon Logo"
                            style={{width: "100%", height: "100%"}}
                        />
                    </div>
                    <div className="top-left">
                        <img
                            src="http://seekvectorlogo.com/wp-content/uploads/2018/12/sugarcrm-vector-logo.png"
                            alt="Turon Logo"
                            style={{width: "200px", height: "75px"}}
                            onClick={() => {
                                history.push("./");
                            }}
                        />
                    </div>
                    <div className="cardoutline">
                        <div className="Welcome">
                            Validate-Hint
                        </div>
                        <input
                            className="emailbox"
                            type="text"
                            label="Email"
                            placeholder="Enter Username"
                            value={this.state.username}
                            onChange={(event) => {
                                this.setState({
                                    username: event.target.value
                                });
                            }}
                        />
                        <input
                            className="passwordbox"
                            type="password"
                            label="password"
                            placeholder="Enter password"
                            value={this.state.password}
                            onChange={(event) => {
                                this.setState({
                                    password: event.target.value
                                });
                            }}
                        />
                        <Button
                            className="Login-btn"
                            type="button"
                            onClick={() => {
                                this.props.log(this.state);
                                this.setState({visible:true, password:""});
                            }}>
                            Verify
                        </Button>

                    </div>
                </div>
            );
        }
}

const mapDispatchToProps =(dispatch)=> {
    return {
        log : (data) => dispatch(actionlogin(data))
    };
}
const mapStateToProps =(stores)=> {
    console.log(stores);
    return {
        loggedin : stores.stores.login,
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
