
import React from 'react';
import MarkerDetailComponent from './markerDetailComponent';
import {createRemoveMarkerAction} from '../action/markerAction';
import {createClearDirectionAction} from './../../direction/action/directionAction';
import { connect } from 'react-redux';

class MarkerList extends React.Component {
    constructor() {
        super();
        this.removeClickHandler = this.removeClickHandler.bind(this);
        this.state = {loading : true};
    }

    removeClickHandler(placeId) {
        const action = createRemoveMarkerAction(placeId);
        this.props.removeMarker(action);
        if(placeId === this.props.direction.toId || placeId === this.props.direction.fromId) {
            this.props.ClearDirectionAction();
        }
    }

    render() {
        return (
            <div className='pt-4 align-bottom' >
                <h2 >Markers</h2>
                <table className='table-borderless table-hover container-fluid'>
                    <tbody>
                        {this.props.markerPlaces.map((markerPlace, index) => <MarkerDetailComponent 
                            key={`Marker_${index}`}
                            index={index}
                            removeClickHandler={this.removeClickHandler}
                            markerPlace={markerPlace}/>)}
                    </tbody>
                </table>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        markerPlaces: state.markers,
        direction: state.direction
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removeMarker: (action) => {dispatch(action)},
        ClearDirectionAction : () => {dispatch(createClearDirectionAction())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkerList);