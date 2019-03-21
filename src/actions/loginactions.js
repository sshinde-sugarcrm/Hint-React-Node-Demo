import * as API from "../api/API";
export const LOGIN ="LOGIN";
export const ENRICH ="ENRICH";
export function actionlogin(userdata) {
    console.log("in login");
    return function (dispatch) {
        try {

            API.doLogin(userdata)
                .then((response) => {
                    try {
                        console.log("inside action", response);
                        dispatch(login("200"));
                    }
                    catch (error) {
                        console.log(error);
                    }
                });
        }
        catch (error) {
            console.log(error);
        }
    }

};

export function login(data) {
    console.log("data in action==>", data.message);
    return {
        type: LOGIN,
        message: "inside login actions",
        data: data
    }
}

export function actionEnrich(userdata) {
    console.log("in Enrich");
    return function (dispatch) {
        try {

            API.doEnrich(userdata)
                .then((response) => {
                    try {
                        console.log("inside Enrich Data-->",response);
                        dispatch(enrich(response));
                    }
                    catch (error) {
                        console.log(error);
                    }
                });
        }
        catch (error) {
            console.log(error);
        }
    }

};

export function enrich(data) {
    console.log("data in action==>", data);
    return {
        type: ENRICH,
        message: "inside enrich actions",
        data: data
    }
}
