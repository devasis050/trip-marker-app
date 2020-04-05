
import searchReducer from '../search/reducer/searchReducer';
import markers from '../map/reducer/markerReducer';
import directionReducer from '../direction/reducer/directionReducer';
import UserReducer from '../header/reducer/userReducer';
import { combineReducers, createStore } from 'redux';
import apiKeyReducer from '../map/reducer/apiKeyReducer';


const rootReducer = combineReducers({searchPlaces:searchReducer, markers, direction: directionReducer, 
    user: UserReducer, apiKey: apiKeyReducer});
export default createStore(rootReducer);

