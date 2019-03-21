const api = process.env.REACT_APP_CONTACTS_API_URL || 'https://sw3.msqa.sugarcrm.com/rest/v11_4/oauth2/token?platform=base';

const headers = {
    'Accept': 'application/json',
    'Access-Control-Allow-Origin':'*'
};
var oAuth="";
var params_URL="https://cors-anywhere.herokuapp.com/https://sw3.msqa.sugarcrm.com/rest/v11_4/stage2/params";
var params="";
var tokenURL="https://cors-anywhere.herokuapp.com/https://sw3.msqa.sugarcrm.com/rest/v11_4/stage2/token";
var accessToken="";
var NewsURL="https://cors-anywhere.herokuapp.com/https://data-enrichment.dev.service.sugarcrm.com/hint/data-enrichment/v1/company-news";
var companyURL="https://cors-anywhere.herokuapp.com/https://data-enrichment.dev.service.sugarcrm.com/hint/data-enrichment/v1/enrich-account-bean";
var subscriptionType="";
var metricsToken="";
var newToken="";

var comp_data="";
var news_data="";
export const doLogin = (payload) =>
    fetch(`https://cors-anywhere.herokuapp.com/${api}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(payload)
    }).then(response => response.json())
        .then(response => {
            console.log("Response from the DES BE-->",response);
            oAuth=response.access_token;
            fetch(params_URL, {
                method: 'GET',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json',
                    'OAuth-Token':oAuth
                },
            }).then(response => response.json())
                .then(response => {
                    console.log("Response from the DES Params--->", response);
                    params=response.instanceId;

                    fetch(tokenURL, {
                        method: 'POST',
                        headers: {
                            ...headers,
                            'Content-Type': 'application/json',
                            'OAuth-Token':oAuth
                        },
                    }).then(response => response.json())
                        .then(response => {
                            console.log("Response from the DES token--->", response);
                            accessToken=response.accessToken;
                            subscriptionType=response.subscriptionType;

                            fetch(`https://cors-anywhere.herokuapp.com/https://sw3.msqa.sugarcrm.com/rest/v11_4/stage2/token`, {
                                method: 'POST',
                                headers: {
                                    ...headers,
                                    'Content-Type': 'application/json',
                                    'OAuth-Token':oAuth
                                },
                            }).then(response => response.json())
                                .then(response => {
                                    console.log("Response from the DES Enrich Token--->", response);
                                    newToken=response.accessToken;
                                })
                        })
                });
            return [oAuth,accessToken,params];
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const doEnrich = (payload) =>


            fetch(companyURL+`?bean=%7B%22annual_revenue%22%3A%22%22%2C%22description%22%3A%22%22%2C%22account_facebook_handle%22%3A%22%22%2C%22account_fiscal_year_end%22%3A%22%22%2C%22account_founded_year%22%3A%22%22%2C%22account_industry%22%3A%22%22%2C%22account_industry_tags%22%3A%22%22%2C%22account_location%22%3A%22%22%2C%22account_logo%22%3A%22%22%2C%22account_naics_code_lbl%22%3A%22%22%2C%22account_size%22%3A%22%22%2C%22name%22%3A%22+${payload.name}+%22%2C%22sic_code%22%3A%22%22%2C%22tag%22%3A%5B%5D%2C%22website%22%3A%22%22%7D`, {
                method: 'GET',
                moduleName: 'Accounts',
                username: 'admin',
                instanceId:params,
                subscriptionType:subscriptionType,
                headers: {
                    ...headers,
                    'Content-Type': 'application/json',
                    'authToken':accessToken
                },
            }).then(response => response.json())
                .then(response => {
                    console.log("Response from the Data Enrich--->",response);
                    metricsToken=response.metricsToken;
                    comp_data=JSON.stringify(response.bean);


                    fetch(NewsURL+`?companyInfo=%7B%22name%22%3A%22+${payload.name}+%22%2C%22domain%22%3A%22%22%7D`, {
                        method: 'GET',
                        moduleName: 'Accounts',
                        metricsToken:metricsToken,
                        headers: {
                            ...headers,
                            'Content-Type': 'application/json',
                            'authToken':newToken
                        },
                    }).then(response => response.json())
                        .then(response => {
                            console.log("Response from the Enrich--->",response);
                            news_data=JSON.stringify(response.news);
                        });
                    return [comp_data,news_data];
                })

        .catch(error => {
            {console.log("accessToken-->",accessToken, "subscriptionType-->", subscriptionType);}
            console.log("This is error");
            return error;
        });
