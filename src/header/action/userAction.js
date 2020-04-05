
import {UPDATE_USER, DELETE_USER} from '../../redux/actionTypes'

const updateUserAction = (user) => {
   return {
        type: UPDATE_USER,
        payload: user
    }
}

const deleteUserAction = () => {
    return {
        type: DELETE_USER,
    }
}

export {updateUserAction, deleteUserAction};