import React, {Component} from 'react';
import {connect} from "react-redux";
import { Button,Form, FormGroup, Label } from 'reactstrap';
import {actionEnrich} from "../actions/loginactions";
class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle:false,
            name:"",
            domain:"",
            news:"",
            search:"",
            flag:true
        };
    }
    renderDashlet(){
        if(this.props.company_data!=null&&this.props.company_data.length!==0){
            return(<div>
                    <div key={this.props.company_data.name}>
                        <div className="mozilla">{this.props.company_data.name}</div>
                        <div className="rectangle5"><img className="a" src={this.props.company_data.account_logo} alt="Sugar App."/></div>
                        <Button color="link" className="mozillaorg" onClick={() => {
                            window.open('http://'+this.props.company_data.website, '_blank');
                        }}>{this.props.company_data.website}</Button>
                        <div className="a2000">{this.props.company_data.account_size}</div>
                        <div className="internetsoftware">{this.props.company_data.account_industry}</div>
                        <div className="a650castrost300">{this.props.company_data.account_location}</div>
                        <div className="mozillaisafreeso">{this.limitWords(this.props.company_data.description,5)}</div>
                        <div className="professionalscient">{this.props.company_data.account_naics_code_label}</div>
                        <div className="a20001">{this.props.company_data.annual_revenue}</div>
                        <div className="a48">{this.props.company_data.sic_code}</div>
                        <div className="a20002">{this.props.company_data.account_fiscal_year_end}</div>
                        <div className="a1998">{this.props.company_data.account_founded_year}</div>
                        <Button color="link" className="wwwfacebookcommoz" onClick={() => {
                            window.open('http://www.facebook.com/'+this.props.company_data.account_facebook_handle,'_blank');
                        }}>www.facebook.com/{this.props.company_data.account_facebook_handle}</Button>
                        <Button color="link" className="wwwtwittercommozi" onClick={() => {
                            window.open('http://www.twitter.com/'+this.props.company_data.account_twitter_handle, '_blank');
                        }}>www.twitter.com/{this.props.company_data.account_twitter_handle}</Button>
                        <div className="informationtechnolo">{this.props.company_data.account_industry_tags}</div>
                    </div>
            }</div>)
        }
        else{
            return(<div></div>);
        }
    }

    limitWords(textToLimit, wordLimit)
    {
        // var finalText = "";
        //
        // var text2 = textToLimit.replace(/\s+/g,'');
        //
        // var text3 = text2.split(' ');
        //
        // var numberOfWords = text3.length;
        //
        // var i=0;
        //
        // if(numberOfWords > wordLimit)
        // {
        //     for(i=0; i< wordLimit; i++)
        //         finalText = finalText+" "+ text3[i]+" ";
        //
        //     return finalText+"...";
        // }
        // else return textToLimit;
    }

    renderToggle(){
        if(this.state.toggle===false){
            return(<Button color="info" className="Create"
                           onClick={() => {
                               this.setState({toggle:true})
                           }}>Create</Button>);
        }
        else return(
            <div><Button color="danger" className="Cancel"
                    onClick={() => {
                        this.setState({toggle:false})
                    }}>Cancel</Button>
                <div className="Cancel-Form">
                <Form inline>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="examplePassword" className="mr-sm-2">Company  &nbsp;   &nbsp;</Label>
                        <input type="text" name="password" id="examplePassword" placeholder="Company name!"
                               onChange={(event) => {
                                   this.setState({name:event.target.value})
                               }}/>
                    </FormGroup>
                    &nbsp;
                    <Button color="success" onClick={ () => {
                           this.props.enrich(this.state);
                           this.setState({search:"", flag:true});
                    }}> Submit</Button>
                </Form></div>
            </div>
        );
    }

    filterNews = (e) => {
        let searchString = e.toLowerCase();
        let responseData = this.props.news_data;
        if(searchString.length > 0){
            this.setState({news:responseData.filter(l => {
                    return l.title.toLowerCase().match(searchString);
                }), flag:false});
        }else{
         this.setState({news:this.props.news_data})
        }
    };

    render(){
        console.log(this.state.name);
    if(this.props.news_data && this.state.flag && this.state.news!==this.props.news_data){
            this.filterNews("");
                    this.setState({flag:false})
            }
        return(
            <div>
                {this.renderToggle()}
                <input id="anPageName" name="page" type="hidden" value="artboard"/>
                <div className="artboard">
                    <div style={{width: "1283px", height: "100%", position:"relative", margin:"auto"}}>
                        <img  className="line" src={require("../images/artboard-line.png")} alt="Sugar-Demo"/>
                        <img  className="line2" src={require("../images/artboard-line-2.png")} alt="Sugar-Demo"/>
                        <img  className="line3" src={require("../images/artboard-line-3.png")} alt="Sugar-Demo"/>
                        <div className="stackedgroup">
                            <div className="rectangle6">
                            </div>
                        </div>
                        <div className="rectangle">
                        </div>
                        <div className="rectangle1">
                        </div>
                        <div className="rectangle2">
                        </div>
                        <div className="rectangle3">
                        </div>
                        <input type="text" className="search" placeholder="Search"
                               onChange={(event) => {
                                   this.filterNews(event.target.value);
                               }}
                        />

                        <div className="rectangle4">
                                {(() => {
                                    if(this.state.news!=null&& this.state.news.length!==0){
                                        // {console.log("Inside News-->", this.state.news);}
                                        return(<div>{this.state.news.map(row => {
                                            return(
                                                <div>
                                                    <div className="rectangle9"><img className="b" src={row.photo_url}  alt={row.publisher}/></div>
                                                    <div className="a12hoursago">{row.date}</div>
                                                    <div className="mozillafirefox" key={row.source_url} onClick={() => {
                                                       window.open(row.source_url);
                                                    }}>{row.title}</div>
                                                    <img  src={require("../images/artboard-line-5.png")} alt="Sugar-Demo" />
                                                </div>
                                            )
                                        })
                                        };
                                        </div>
                                        )
                                    }
                                    else{
                                        return(<div></div>);
                                    }
                                })()}
                            </div>
                        <div className="news">
                            News
                        </div>
                        <div className="hint">
                            Hint
                        </div>
                        <div className="stackedgroup1">
                        </div>
                        <div className="companylocation">
                            Company Location
                        </div>
                        <div className="annualrev">
                            Annual Rev
                        </div>
                        <div className="siccode">
                            SIC Code
                        </div>
                        <div className="yearfounded">
                            Year Founded
                        </div>
                        <div className="companysize">
                            Company Size
                        </div>
                        <div className="industry">
                            Industry
                        </div>
                        <div className="naicscode">
                            NAICS Code
                        </div>
                        <div className="companyfacebook">
                            Company Facebook
                        </div>
                        <div className="companytwitter">
                            Company Twitter
                        </div>
                        <div className="industrytags">
                            Industry Tags
                        </div>
                        <div className="companydescription">
                            Company Description
                        </div>
                        <div className="fyend">
                            FY End
                        </div>
                        <div className="hint1">
                            Hint
                        </div>
                        <div className="accounts">
                            Accounts
                        </div>
                        <img anima-src={require("../images/artboard-line.png")} className="line4" src={require("../images/artboard-line.png")} alt="Sugar-Demo"/>
                        {/*<img className="line5" src={require("../images/artboard-line-5.png")} alt="Sugar-Demo" />*/}
                        <div className="hintreactjsnodej">
                            Hint React.js Node.js Demo
                        </div>
                        {this.renderDashlet()}
                    </div>
                </div>
             </div>

        )
    }
}

const mapDispatchToProps =(dispatch)=> {
    return {
        enrich : (data) => dispatch(actionEnrich(data))
    };
}
const mapStateToProps =(stores)=> {
    console.log(stores);
    return {
        company_data : stores.stores.company_data,
        news_data:stores.stores.news_data
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Welcome);

//export default withRouter(Welcome);
