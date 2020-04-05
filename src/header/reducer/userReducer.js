import {UPDATE_USER, DELETE_USER} from '../../redux/actionTypes'

function UserReducer(state={}, action) {
    if(action.type === UPDATE_USER) {
        return action.payload;
    } else if(action.type === DELETE_USER) {
        return {isAuthenticated:false};
    } else {
        return state;
    }
}


export default UserReducer;