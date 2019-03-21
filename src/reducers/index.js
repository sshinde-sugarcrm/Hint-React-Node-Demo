import {LOGIN} from '../actions/loginactions';
import {ENRICH} from '../actions/loginactions';
const initialState = {
    "stores":{

    }
};

const stores= (state = initialState, action) => {


    switch (action.type) {

        case LOGIN:
            console.log("status",action.data);
            return {
                ...state,
                "stores":{
                    "email":action.data.email,
                    "login_id":action.data.login_id,
                    "login":action.data
                },

            };

        case ENRICH:
            console.log("status",action.data.status);
            return {
                ...state,
                "stores":{
                    company_data:JSON.parse(action.data[0]),
                    news_data:JSON.parse(action.data[1])
                },

            };
        default :
            return state;

    }
};

export default stores;
