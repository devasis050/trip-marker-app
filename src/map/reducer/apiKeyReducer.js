import { ADD_API_KEY } from "../../redux/actionTypes";


const apiKeyReducer = (state = '', action) => {
    if(action.type === ADD_API_KEY) {
        return action.payload;
    } else {
        return state;
    }
}

export default apiKeyReducer;
