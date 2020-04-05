import {ADD_MARKER, REMOVE_MARKER, ADD_API_KEY} from '../../redux/actionTypes'

const createAddMarkerAction = (marker) => {
    return {
        type: ADD_MARKER,
        payload: {markerPlace:marker}
    }
}

const createRemoveMarkerAction = (placeId) => {
    return {type: REMOVE_MARKER, payload : {placeId}};
}

const createAddApiKeyAction = (key) => {
    return {type: ADD_API_KEY, payload:key};
}

export {createAddMarkerAction, createRemoveMarkerAction, createAddApiKeyAction};